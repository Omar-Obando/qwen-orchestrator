---
name: multi-channel-funnels
description: Guide for designing lead generation funnels across multiple messaging platforms (WhatsApp, WeChat, Telegram, Facebook, Instagram, LINE, etc.) with funnel architecture, platform-specific patterns, and conversion optimization
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
This skill is for planning funnel architecture and platform integration. After this skill, use implementation skills (TDD, API design, domain-driven) to build the actual funnel.
</EXTREMELY-IMPORTANT>

## Multi-Channel Lead Generation Funnels

Modern businesses need to capture leads across **multiple messaging platforms**. This skill covers funnel architecture, platform-specific patterns, and conversion optimization for WhatsApp, WeChat, Telegram, Facebook, Instagram, LINE, and other messaging channels.

---

## Platform Overview

| Platform               | Region         | Use Case                              | API Access               | Best For                       |
| ---------------------- | -------------- | ------------------------------------- | ------------------------ | ------------------------------ |
| **WhatsApp**           | Global         | Business communications, lead capture | ✅ WhatsApp Business API | SMBs, LATAM, Europe            |
| **WeChat**             | China, Asia    | Business services, e-commerce         | ✅ WeChat Open Platform  | China market, Asian businesses |
| **Telegram**           | Global         | Customer support, broadcasts          | ✅ Telegram Bot API      | Tech-savvy users, global       |
| **Facebook Messenger** | Global         | E-commerce, support, ads              | ✅ Messenger Platform    | Facebook ads, e-commerce       |
| **Instagram DM**       | Global         | Influencer marketing, visual brands   | ✅ Instagram Graph API   | Visual brands, influencers     |
| **LINE**               | Japan, SEA     | Customer service, payments            | ✅ LINE Messaging API    | Japan, Thailand, Indonesia     |
| **Viber**              | Europe, Israel | Business notifications                | ✅ Viber API             | Europe, Israel                 |
| **SMS/Email**          | Global         | Backup channels, compliance           | ✅ Twilio, SendGrid      | Universal fallback             |

---

## Funnel Architecture

### Standard Multi-Channel Funnel

```
Landing Page (Website)
    ↓
Lead Capture Form (Name, Email, Phone, Message)
    ↓
Platform Selection (User chooses their preferred channel)
    ↓
Channel-Specific Flow:
    ├─ WhatsApp → Pre-filled message (wa.me/1234567890)
    ├─ WeChat → QR code + scan instructions
    ├─ Telegram → Bot link (t.me/yourbot)
    ├─ Facebook → Messenger link (m.me/yourpage)
    ├─ Instagram → DM link (instagram.com/_u/yourpage/messages)
    └─ SMS/Email → Pre-filled message
    ↓
Confirmation Page ("Check your preferred channel!")
    ↓
Channel-Specific Follow-up
```

### Platform-Specific Funnel Paths

#### WhatsApp Funnel

```
Landing Page
    ↓
Form: Name, Phone, Service Needed
    ↓
WhatsApp Pre-filled Message
    ↓
wa.me/{country_code}{phone_number}?text={encoded_message}
    ↓
WhatsApp Chat (Business Profile visible)
```

#### WeChat Funnel

```
Landing Page (with Chinese language)
    ↓
Form: Name, WeChat ID, Service Needed
    ↓
QR Code + Scan Instructions
    ↓
WeChat Scan → Add Friend/Subscribe
    ↓
Welcome Message → Service Options
```

#### Telegram Funnel

```
Landing Page
    ↓
Form: Name, Telegram Username, Service Needed
    ↓
Telegram Bot Link
    ↓
t.me/{bot_username}?start={user_id}
    ↓
Bot Welcome Message → Service Selection
```

#### Facebook Messenger Funnel

```
Landing Page
    ↓
Form: Name, Email, Service Needed
    ↓
Messenger CTA Button
    ↓
m.me/{page_username}?ref={tracking_param}
    ↓
Messenger Chat → Bot or Live Agent
```

#### Instagram DM Funnel

```
Landing Page (Visual-focused)
    ↓
Form: Name, Instagram Handle, Service Needed
    ↓
Instagram DM Button
    ↓
instagram.com/_u/{username}/messages/?entry_point={source}
    ↓
Instagram DM → Quick Replies
```

---

## Platform-Specific Best Practices

### WhatsApp Best Practices

#### 1. Business Profile Setup

```json
{
  "messaging_feature": {
    "whatsapp_business_profile": {
      "about": "We provide professional services with 24/7 support",
      "address": "123 Main St, City, Country",
      "description": "Your trusted partner for [service]",
      "email": "contact@business.com",
      "hours": "Mo-Fr 09:00-18:00",
      "website": "https://business.com",
      "categories": ["Service Provider", "Retail"]
    }
  }
}
```

#### 2. Quick Replies

```json
{
  "quick_replies": [
    { "id": "qr_1", "title": "View Services" },
    { "id": "qr_2", "title": "Check Availability" },
    { "id": "qr_3", "title": "Get Quote" },
    { "id": "qr_4", "title": "Contact Support" }
  ]
}
```

#### 3. Message Templates

```json
{
  "message_templates": [
    {
      "name": "welcome_message",
      "language": "en_US",
      "category": "UTILITY",
      "components": [
        {
          "type": "BODY",
          "text": "Hi {{1}}, thanks for contacting us! How can we help you today?"
        }
      ]
    },
    {
      "name": "quote_sent",
      "language": "en_US",
      "category": "MARKETING",
      "components": [
        { "type": "BODY", "text": "Here's your quote for {{1}}: {{2}}" }
      ]
    }
  ]
}
```

### WeChat Best Practices

#### 1. Official Account Setup

```json
{
  "wechat_official_account": {
    "account_type": "service", // or "subscription"
    "verified": true,
    "functions": [
      "message_reception",
      "auto_reply",
      "custom_menu",
      "payment",
      "mini_program"
    ]
  }
}
```

#### 2. Mini Program Integration

```
Landing Page
    ↓
"Scan to Open Mini Program"
    ↓
WeChat Mini Program → Service Selection
    ↓
In-app Form → WeChat Payment
```

### Telegram Best Practices

#### 1. Bot Commands

```json
{
  "bot_commands": [
    { "command": "start", "description": "Start conversation" },
    { "command": "services", "description": "View our services" },
    { "command": "quote", "description": "Get a quote" },
    { "command": "contact", "description": "Contact support" }
  ]
}
```

#### 2. Inline Keyboard

```json
{
  "inline_keyboard": [
    [
      { "text": "View Services", "callback_data": "services" },
      { "text": "Get Quote", "callback_data": "quote" }
    ],
    [
      { "text": "Contact Support", "callback_data": "support" },
      { "text": "Our Location", "callback_data": "location" }
    ]
  ]
}
```

### Facebook Messenger Best Practices

#### 1. Get Started Button

```json
{
  "persistent_menu": [
    {
      "locale": "default",
      "composer_input_disabled": false,
      "call_to_actions": [
        { "type": "postback", "title": "Start Chat", "payload": "GET_STARTED" },
        {
          "type": "web_url",
          "title": "Visit Website",
          "url": "https://business.com"
        },
        {
          "type": "postback",
          "title": "Contact Info",
          "payload": "CONTACT_INFO"
        }
      ]
    }
  ]
}
```

#### 2. Quick Replies

```json
{
  "quick_replies": [
    { "content_type": "text", "title": "Services", "payload": "SERVICES" },
    { "content_type": "text", "title": "Pricing", "payload": "PRICING" },
    { "content_type": "text", "title": "Contact", "payload": "CONTACT" }
  ]
}
```

### Instagram DM Best Practices

#### 1. Bio Link

```
Instagram Bio:
"Get your free quote! 👇"
🔗 business.com/quote
📍 [Location]
⏰ Mo-Fr 9am-6pm
```

#### 2. Highlights

```
Instagram Highlights:
├─ 📝 Services
├─ 💰 Pricing
├─ 📸 Portfolio
├─ ⭐ Reviews
└─ 📍 Location
```

---

## Multi-Channel Funnel Design Patterns

### Pattern 1: Platform Selection Page

```
Landing Page
    ↓
"Where do you prefer to chat?"
    ↓
Platform Cards:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   WhatsApp  │  │  Telegram   │  │  Facebook   │
│   🟢 Green  │  │  🔵 Blue    │  │  🔵 Blue    │
│  wa.me/...  │  │  t.me/...   │  │  m.me/...   │
└─────────────┘  └─────────────┘  └─────────────┘
    ↓
Platform-Specific Flow
```

### Pattern 2: Smart Routing

```
User enters form
    ↓
Detect platform preference (from phone number, username, etc.)
    ↓
Auto-route to preferred channel:
├─ Phone number? → WhatsApp
├─ Telegram username? → Telegram
├─ Facebook profile? → Messenger
└─ WeChat ID? → WeChat
    ↓
Pre-filled message on selected platform
```

### Pattern 3: Hybrid Approach

```
Landing Page (Website)
    ↓
Form: Name, Email, Phone, Message
    ↓
"Choose your preferred contact method:"
├─ WhatsApp (wa.me/...) - Instant response
├─ Telegram (t.me/...) - Fast, secure
├─ Email (mailto:...) - Formal, documented
└─ Phone (tel:...) - Immediate conversation
    ↓
Confirmation with all options
```

---

## Platform Integration Implementation

### WhatsApp Integration

#### Direct Link (Simple)

```html
<!-- Simple WhatsApp CTA -->
<a
  href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20saber%20más"
  target="_blank"
>
  <img src="whatsapp-icon.png" alt="Chat on WhatsApp" />
</a>
```

#### Business API (Advanced)

```javascript
// WhatsApp Business API integration
const waApi = require('whatsapp-business-api');

const client = new waApi.Client({
  phoneNumberId: process.env.WA_PHONE_ID,
  accessToken: process.env.WA_ACCESS_TOKEN,
});

// Send template message
await client.messages.create({
  to: '1234567890',
  template: {
    name: 'welcome_message',
    language: { code: 'en_US' },
    components: [
      { type: 'body', parameters: [{ type: 'text', text: 'John' }] },
    ],
  },
});
```

### WeChat Integration

#### QR Code Generation

```javascript
// WeChat QR code for mini program
const qrCode = require('weixin-qr-code');

qrCode(
  {
    path: 'pages/service/index?id=123',
    width: 300,
    height: 300,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  'qr-code.png'
);
```

### Telegram Integration

#### Bot Link with Start Parameter

```html
<!-- Telegram bot link -->
<a href="https://t.me/yourbot?start=lead_123" target="_blank">
  Chat on Telegram
</a>
```

### Facebook Messenger Integration

#### Messenger CTA

```html
<!-- Facebook Messenger CTA -->
<iframe
  src="https://www.facebook.com/plugins/message_plugin.php?href=https%3A%2F%2Fwww.facebook.com%2Fyourpage&width=300&height=400&app_id=YOUR_APP_ID&locale=en_US"
  width="300"
  height="400"
  style="border:none;overflow:hidden"
  scrolling="no"
  frameborder="0"
  allowTransparency="true"
  allow="encrypted-media"
></iframe>
```

---

## Conversion Optimization

### A/B Testing Checklist

| Element        | Test Variations                       | Metric to Track    |
| -------------- | ------------------------------------- | ------------------ |
| CTA Text       | "Chat on WhatsApp" vs "Get Quote Now" | Click-through rate |
| Platform Order | WhatsApp first vs Telegram first      | Platform selection |
| Form Fields    | 3 fields vs 5 fields                  | Conversion rate    |
| Color Scheme   | Green (WhatsApp) vs Blue (Telegram)   | Engagement         |
| Position       | Hero section vs Footer                | Click position     |

### Analytics & Tracking

#### UTM Parameters

```
# WhatsApp
https://wa.me/1234567890?utm_source=website&utm_medium=landing&utm_campaign=spring2024

# Telegram
https://t.me/yourbot?start=lead&utm_source=website&utm_medium=blog&utm_campaign=summer2024

# Facebook
https://m.me/yourpage?ref=landing_page&utm_source=facebook&utm_medium=cpc&utm_campaign=retargeting
```

#### Event Tracking

```javascript
// Track platform selection
function trackPlatformSelection(platform) {
  gtag('event', 'platform_selection', {
    event_category: 'conversion',
    event_label: platform,
    value: 1,
  });
}

// Track message open
function trackMessageOpen(platform) {
  gtag('event', 'message_open', {
    event_category: 'engagement',
    event_label: platform,
  });
}

// Track conversion
function trackConversion(platform, value) {
  gtag('event', 'conversion', {
    event_category: 'conversion',
    event_label: platform,
    value: value,
  });
}
```

---

## Common Mistakes to Avoid

| Mistake                       | Impact                 | Solution                        |
| ----------------------------- | ---------------------- | ------------------------------- |
| No WhatsApp Business Profile  | Low trust, no features | Set up business profile         |
| Long pre-filled messages      | Users delete them      | Keep messages < 200 chars       |
| No platform selection         | Users frustrated       | Let users choose their platform |
| Missing QR codes for WeChat   | Can't connect          | Always provide QR code          |
| No bot commands for Telegram  | Confusing experience   | Set up helpful commands         |
| No Messenger CTA              | Missed Facebook leads  | Add Messenger plugin            |
| Ignoring regional preferences | Low engagement         | Research regional preferences   |

---

## Regional Platform Preferences

| Region          | Primary Platform | Secondary | Notes                              |
| --------------- | ---------------- | --------- | ---------------------------------- |
| **LATAM**       | WhatsApp         | Telegram  | WhatsApp is dominant               |
| **Europe**      | WhatsApp         | Messenger | Both popular                       |
| **USA**         | Messenger        | WhatsApp  | Facebook-owned platforms preferred |
| **China**       | WeChat           | WeCom     | WeChat is essential                |
| **Japan**       | LINE             | WhatsApp  | LINE has integrated services       |
| **SEA**         | WhatsApp         | LINE      | WhatsApp growing, LINE established |
| **Middle East** | WhatsApp         | Telegram  | Both widely used                   |

---

## Multi-Channel Funnel Checklist

Before completing the funnel, ensure:

- [ ] WhatsApp Business Profile set up (if applicable)
- [ ] WeChat QR code generated and tested
- [ ] Telegram bot commands configured
- [ ] Facebook Messenger CTA added
- [ ] Instagram DM link working
- [ ] Pre-filled messages optimized for each platform
- [ ] Platform selection page designed
- [ ] Analytics tracking implemented
- [ ] A/B testing plan created
- [ ] Regional preferences researched
- [ ] Business hours set for each platform
- [ ] Quick replies configured
- [ ] Message templates approved
- [ ] Conversion tracking in place

---

## Platform-Specific Examples

### Example 1: Restaurant Website

```
Landing Page (Spanish)
    ↓
"¿Cómo te gustaría pedir?"
    ↓
Platform Cards:
├─ 🟢 WhatsApp: wa.me/50511223344?text=Hola,%20quiero%20hacer%20un%20pedido
├─ 🔵 Telegram: t.me/restaurantbot?start=order
└─ 📱 SMS: sms:+50511223344?body=Hola,%20quiero%20hacer%20un%20pedido
    ↓
"¡Revisa tu WhatsApp/Telegram/SMS!"
```

### Example 2: Service Business (Consulting)

```
Landing Page (English)
    ↓
"Get your free consultation"
    ↓
Form: Name, Email, Phone, Service Needed
    ↓
"Choose your preferred contact method:"
├─ 🟢 WhatsApp: wa.me/1234567890?text=Hola,%20me%20gustaría%20una%20consultoría
├─ 🔵 Telegram: t.me/consultbot?start=lead
├─ 🔵 Messenger: m.me/consultpage?ref=landing
└─ 📧 Email: mailto:info@consulting.com?subject=Consultation%20Request
    ↓
Confirmation with all contact options
```

### Example 3: E-commerce Store

```
Landing Page (Portuguese)
    ↓
"Quer saber mais? Fale conosco!"
    ↓
Platform Selection:
├─ WhatsApp (Brazil): wa.me/5511999999999
├─ WhatsApp (International): wa.me/14155550000
├─ Telegram: t.me/storebot
└─ WeChat: [QR Code]
    ↓
"Check your preferred channel!"
```

---

## Next Steps

After this skill:

1. **Platform Selection**: Use `AskUserQuestion` to let users choose their preferred platform
2. **Form Design**: Use `designing-apis` skill for lead capture forms
3. **Implementation**: Use `team-implementer` agent to build the funnel
4. **Testing**: Use `test-driven-development` skill for funnel testing
5. **Analytics**: Set up tracking and A/B testing

---

## Recommended Resources

| Platform  | Documentation                                                                  | API                   |
| --------- | ------------------------------------------------------------------------------ | --------------------- |
| WhatsApp  | [Business API Docs](https://developers.facebook.com/docs/whatsapp/)            | WhatsApp Business API |
| WeChat    | [Open Platform](https://developers.weixin.qq.com/)                             | WeChat Open Platform  |
| Telegram  | [Bot API](https://core.telegram.org/bots/api)                                  | Telegram Bot API      |
| Facebook  | [Messenger Platform](https://developers.facebook.com/docs/messenger-platform/) | Messenger Platform    |
| Instagram | [Graph API](https://developers.facebook.com/docs/instagram-api/)               | Instagram Graph API   |
| LINE      | [Messaging API](https://developers.line.biz/en/docs/messaging-api/)            | LINE Messaging API    |
