---
name: third-party-integrations
description: Guide for designing and implementing integrations with third-party services (webhooks, REST APIs, SOAP, OAuth, payment gateways, email services)
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
This skill is for planning integrations, NOT for implementation. After this skill, use implementation skills (TDD, API design, domain-driven) to build the actual integration.
</EXTREMELY-IMPORTANT>

## Third-Party Integration Strategy

When integrating with third-party services (webhooks, REST APIs, SOAP, OAuth, payment gateways, email services), follow this systematic approach to avoid common pitfalls and ensure maintainability.

---

## Integration Types Overview

| Type           | Use Case                        | Complexity | Maintenance | Example Services            |
| -------------- | ------------------------------- | ---------- | ----------- | --------------------------- |
| **Webhooks**   | Receive real-time notifications | Medium     | Low         | Stripe, GitHub, Slack       |
| **REST API**   | CRUD operations                 | Low-Medium | Medium      | Stripe, PayPal, SendGrid    |
| **SOAP**       | Legacy systems, enterprise      | High       | High        | Banking systems, legacy ERP |
| **OAuth**      | User authorization              | Medium     | Medium      | Google, Facebook, GitHub    |
| **Email APIs** | Send/receive emails             | Low        | Medium      | SendGrid, Mailgun, SES      |

---

## Integration Decision Tree

```
What do you need to integrate?
├─ Real-time notifications?
│  ├─ Yes → Webhooks
│  │   ├─ Need to verify signatures? → Yes → Implement signature verification
│  │   └─ Need to handle retries? → Yes → Implement retry queue
│  └─ No → Continue
├─ CRUD operations?
│  ├─ Yes → REST API
│  │   ├─ Simple CRUD? → Yes → Direct client
│  │   └─ Complex operations? → No → Service layer pattern
│  └─ No → Continue
├─ Legacy enterprise system?
│  ├─ Yes → SOAP
│  │   ├─ WSDL available? → Yes → Generate client from WSDL
│  │   └─ No WSDL? → No → Document-first design
│  └─ No → Continue
└─ User authentication?
    ├─ Yes → OAuth 2.0
    │   ├─ Google/Facebook/GitHub? → Yes → Use official SDK
    │   └─ Custom auth server? → No → Implement OAuth flow
    └─ No → Continue
```

---

## Webhook Integration Strategy

### 1. Security First

**Always verify webhook signatures:**

```typescript
// Stripe webhook signature verification
const signature = req.headers['stripe-signature'];
const payload = JSON.stringify(req.body);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

try {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret
  );
  // Process event
} catch (err) {
  return res
    .status(400)
    .send(`Webhook signature verification failed: ${err.message}`);
}
```

**Best practices:**

- Store webhook secrets in environment variables
- Verify signatures before processing
- Log all webhook attempts (success and failure)
- Use HTTPS only

### 2. Idempotency

**Always make webhook handlers idempotent:**

```typescript
// Check if event was already processed
const existingEvent = await db.events.findUnique({
  where: { externalId: event.id },
});

if (existingEvent) {
  console.log(`Event ${event.id} already processed, skipping`);
  return res.status(200).send();
}

// Process event
await processEvent(event);

// Mark as processed
await db.events.create({
  data: { externalId: event.id, type: event.type, processedAt: new Date() },
});
```

### 3. Retry Strategy

**Implement automatic retries with backoff:**

```typescript
async function processWebhookWithRetry(event, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await processEvent(event);
      return; // Success
    } catch (error) {
      if (attempt === maxRetries) {
        await queueFailedWebhook(event, error);
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
    }
  }
}
```

### 4. Testing Webhooks

**Use ngrok for local testing:**

```bash
# Start your local server
npm run dev

# Expose to internet
ngrok http 3000

# Configure webhook URL in third-party service
# Use the ngrok URL: https://abc123.ngrok.io/webhooks/stripe
```

---

## REST API Integration Strategy

### 1. Client Architecture

**Use a service layer pattern:**

```
src/
├─ services/
│  ├─ stripe/
│  │  ├─ client.ts       # API client configuration
│  │  ├─ payments.ts     # Payment operations
│  │  ├─ customers.ts    # Customer operations
│  │  └─ webhooks.ts     # Webhook handling
│  └─ sendgrid/
│     ├─ client.ts
│     └─ emails.ts
```

### 2. Request/Response Types

**Always define types for API requests and responses:**

```typescript
// stripe/types.ts
export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreateCustomerInput {
  email: string;
  name?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  clientSecret: string;
}
```

### 3. Error Handling

**Normalize third-party errors:**

```typescript
export class ThirdPartyError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ThirdPartyError';
  }
}

export async function createCustomer(
  input: CreateCustomerInput
): Promise<StripeCustomer> {
  try {
    const response = await stripe.customers.create(input);
    return response;
  } catch (error) {
    if (error instanceof Stripe.errors.ApiError) {
      throw new ThirdPartyError(error.message, 'stripe', error.code, error.raw);
    }
    throw error;
  }
}
```

### 4. Rate Limiting

**Implement rate limiting:**

```typescript
class RateLimiter {
  private requests: number[] = [];
  private readonly limit = 100; // requests per minute
  private readonly windowMs = 60 * 1000; // 1 minute

  async wait() {
    const now = Date.now();
    this.requests = this.requests.filter((t) => now - t < this.windowMs);

    if (this.requests.length >= this.limit) {
      const oldest = this.requests[0];
      const delay = this.windowMs - (now - oldest);
      await sleep(delay);
    }

    this.requests.push(now);
  }
}
```

---

## SOAP Integration Strategy

### 1. Client Generation

**Generate client from WSDL:**

```bash
# Node.js with node-soap
npm install soap

# Generate client
const soap = require('soap');
const url = 'https://example.com/service?wsdl';

soap.createClient(url, (err, client) => {
  if (err) {
    console.error('Failed to create SOAP client:', err);
    return;
  }

  // Use client
  client.MyFunction(args, (err, result) => {
    // Handle result
  });
});
```

**PHP with Phpro SOAP-client:**

```bash
composer require phpro/soap-client
```

```php
// Generate types from WSDL
vendor/bin/soap-client generate \
    --wsdl=https://example.com/service?wsdl \
    --target=src/SoapClient
```

### 2. Type Safety

**Always use generated types:**

```typescript
// Generated from WSDL
interface GetCustomerRequest {
  customerId: string;
}

interface GetCustomerResponse {
  customer: Customer;
  timestamp: string;
}
```

### 3. Security

**SOAP-specific security considerations:**

- Use WS-Security for authentication
- Validate SOAP envelopes
- Sanitize all inputs
- Use HTTPS for transport security

---

## OAuth Integration Strategy

### 1. Flow Selection

| Flow                   | Use Case                 | Example          |
| ---------------------- | ------------------------ | ---------------- |
| **Authorization Code** | Web apps, secure backend | Google, Facebook |
| **PKCE**               | Mobile/native apps       | Mobile apps      |
| **Client Credentials** | Server-to-server         | Service accounts |
| **Password**           | Legacy systems (avoid)   | Not recommended  |

### 2. Authorization Code Flow

```typescript
// 1. Redirect to provider
const authorizationUrl = `https://provider.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(' ')}`;

// 2. Exchange code for token
async function exchangeCodeForToken(code: string) {
  const response = await fetch('https://provider.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  return response.json();
}

// 3. Use access token
async function getUserProfile(accessToken: string) {
  const response = await fetch('https://provider.com/api/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.json();
}
```

### 3. Token Storage

**Never store tokens in localStorage:**

```typescript
// ❌ Bad: localStorage
localStorage.setItem('accessToken', token);

// ✅ Good: HTTP-only cookie
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000, // 1 hour
});
```

---

## Payment Gateway Integration (Stripe Example)

### 1. Architecture

```
payment/
├─ client.ts          # Stripe client configuration
├─ checkout.ts        # Checkout session creation
├─ webhooks.ts        # Webhook handlers
├─ refunds.ts         # Refund processing
└─ types.ts           # TypeScript definitions
```

### 2. Checkout Session

```typescript
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionInput): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      customerId,
      priceId,
    },
  });

  return session.url;
}
```

### 3. Webhook Handler

```typescript
export async function handleStripeWebhook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'];
  const payload = JSON.stringify(req.body);

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
    }

    res.status(200).send();
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
}
```

---

## Email Service Integration (SendGrid Example)

### 1. Template Management

**Use transactional templates:**

```typescript
export async function sendWelcomeEmail({ to, name }: SendWelcomeEmailInput) {
  const msg = {
    to,
    from: 'welcome@yourapp.com',
    templateId: 'd-transactional-welcome-id',
    dynamicTemplateData: {
      name,
      unsubscribe_url: generateUnsubscribeUrl(to),
    },
  };

  return sgMail.send(msg);
}
```

### 2. Error Handling

```typescript
export async function sendEmailWithFallback({
  to,
  subject,
  html,
  text,
}: SendEmailInput) {
  try {
    await sendgrid.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      html,
      text,
    });
  } catch (error) {
    // Log error
    console.error('Email send failed:', error);

    // Fallback to SMTP
    if (error.code === 'ESEND') {
      await sendViaSMTP({ to, subject, html, text });
    }

    // Notify admin
    await notifyAdmin(`Email failed to ${to}: ${error.message}`);
  }
}
```

---

## Integration Testing Strategy

### 1. Mock Third-Party Services

```typescript
// __mocks__/stripe.ts
export default {
  customers: {
    create: jest.fn().mockResolvedValue({
      id: 'cus_mock123',
      email: 'test@example.com',
    }),
  },
  charges: {
    create: jest.fn().mockResolvedValue({
      id: 'ch_mock123',
      status: 'succeeded',
    }),
  },
};
```

### 2. Integration Tests

```typescript
describe('Stripe Integration', () => {
  it('creates a customer and charges them', async () => {
    const customer = await createCustomer({ email: 'test@example.com' });
    expect(customer.id).toMatch(/^cus_/);

    const payment = await createPayment({
      customerId: customer.id,
      amount: 1000,
      currency: 'usd',
    });

    expect(payment.status).toBe('succeeded');
  });
});
```

### 3. Test Environment Variables

```bash
# .env.test
STRIPE_API_KEY=<your-stripe-test-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>
SENDGRID_API_KEY=<your-sendgrid-key>
```

---

## Monitoring and Alerting

### 1. Track Integration Health

```typescript
const integrationMetrics = {
  stripe: {
    requests: 0,
    failures: 0,
    avgResponseTime: 0,
  },
};

// Track metrics
function trackIntegrationMetric(
  provider: string,
  duration: number,
  success: boolean
) {
  integrationMetrics[provider].requests++;
  integrationMetrics[provider].avgResponseTime =
    (integrationMetrics[provider].avgResponseTime + duration) / 2;

  if (!success) {
    integrationMetrics[provider].failures++;

    if (integrationMetrics[provider].failures % 10 === 0) {
      notifyAdmin(
        `${provider} integration degraded: ${integrationMetrics[provider].failures} failures`
      );
    }
  }
}
```

### 2. Alerting Thresholds

```typescript
const INTEGRATION_ALERTS = {
  stripe: {
    failureRateThreshold: 0.05, // 5%
    responseTimeThreshold: 2000, // 2 seconds
    consecutiveFailures: 5,
  },
};
```

---

## Common Pitfalls and How to Avoid Them

### 1. Rate Limiting

**Pitfall**: Ignoring rate limits

**Solution**: Implement rate limiting in your client

```typescript
const limiter = new RateLimiter(100, 60000); // 100 requests per minute
await limiter.wait();
```

### 2. Webhook Verification

**Pitfall**: Not verifying webhook signatures

**Solution**: Always verify signatures before processing

```typescript
const event = stripe.webhooks.constructEvent(payload, signature, secret);
```

### 3. Error Handling

**Pitfall**: Not normalizing third-party errors

**Solution**: Wrap third-party errors in your own error class

```typescript
throw new ThirdPartyError(message, 'stripe', code, details);
```

### 4. State Management

**Pitfall**: Not tracking third-party IDs

**Solution**: Store third-party IDs in your database

```typescript
await db.users.update({
  where: { id: userId },
  data: { stripeCustomerId: stripeCustomer.id },
});
```

---

## Quick Reference

### Webhook Checklist

- [ ] Verify signature before processing
- [ ] Make handler idempotent
- [ ] Log all attempts
- [ ] Implement retry with backoff
- [ ] Test with ngrok locally
- [ ] Monitor failure rates

### REST API Checklist

- [ ] Define types for requests/responses
- [ ] Use service layer pattern
- [ ] Normalize errors
- [ ] Implement rate limiting
- [ ] Test with mocks
- [ ] Document endpoints

### OAuth Checklist

- [ ] Use Authorization Code flow (not password)
- [ ] Store tokens in HTTP-only cookies
- [ ] Implement token refresh
- [ ] Handle token expiration
- [ ] Securely store client secrets

### Payment Gateway Checklist

- [ ] Use webhooks for status updates
- [ ] Verify webhook signatures
- [ ] Implement idempotency keys
- [ ] Handle partial failures
- [ ] Test with Stripe test mode

---

## Recommended Libraries

| Service     | Language              | Library                      |
| ----------- | --------------------- | ---------------------------- |
| Stripe      | TypeScript/JavaScript | `@stripe/stripe-node`        |
| Stripe      | PHP                   | `stripe/stripe-php`          |
| SendGrid    | TypeScript/JavaScript | `@sendgrid/mail`             |
| SendGrid    | PHP                   | `sendgrid/sendgrid`          |
| PayPal      | TypeScript/JavaScript | `@paypal/paypal-js`          |
| PayPal      | PHP                   | `paypal/paypal-checkout-sdk` |
| GitHub      | TypeScript/JavaScript | `@octokit/rest`              |
| GitHub      | PHP                   | `github/github`              |
| Google APIs | TypeScript/JavaScript | `googleapis`                 |
| Google APIs | Python                | `google-api-python-client`   |
| SOAP        | TypeScript/JavaScript | `soap`                       |
| SOAP        | PHP                   | `phpro/soap-client`          |

---

## Next Steps

After this skill completes:

1. **API Design**: Use `designing-apis` skill for endpoint design
2. **TDD**: Use `test-driven-development` skill for tests
3. **Implementation**: Use `team-implementer` agent for code
4. **Security**: Use `security-auditor` agent for security review
