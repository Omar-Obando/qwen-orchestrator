---
name: supabase
description: >
  Supabase backend-as-a-service development patterns — Row Level Security (RLS) on
  all public tables, Edge Functions with Deno runtime, PostgreSQL with auto-generated
  APIs, authentication with JWT and context via Authorization header, createClient
  with global headers, real-time subscriptions, storage buckets, and migration
  management.
license: MIT
---

# Supabase Development Skill — Backend-as-a-Service Mastery

This skill provides comprehensive Supabase development patterns for building secure, scalable applications with PostgreSQL at the core, Row Level Security as the primary access control, and auto-generated APIs.

## Key Principles

- **Security at the Database Layer**: Row Level Security (RLS) on ALL public tables
- **PostgreSQL-First**: Use PostgreSQL features (functions, triggers, policies) over application code
- **Auto-Generated APIs**: PostgREST provides instant CRUD without writing endpoints
- **JWT-Based Auth**: Every request carries auth context; RLS policies use `auth.uid()`

## Client Setup

### TypeScript Client

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types'; // Auto-generated types

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        // Pass auth token for server-side requests
        Authorization: `Bearer ${userToken}`,
      },
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);
```

### Type-Safe Client Generation

```bash
# Generate types from your database schema
npx supabase gen types typescript --linked > src/database.types.ts
```

### Environment Keys

| Key                         | Visibility      | Use Case                        |
| --------------------------- | --------------- | ------------------------------- |
| `SUPABASE_URL`              | Public          | Client initialization           |
| `SUPABASE_ANON_KEY`         | Public          | Client requests (anon role)     |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Bypasses RLS (admin operations) |

**WARNING**: NEVER expose `SERVICE_ROLE_KEY` in client-side code.

## Row Level Security (RLS)

### Enable RLS on Every Public Table

```sql
-- MANDATORY: Enable RLS on every table exposed via the API
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- NEVER leave a table without RLS if it has data users shouldn't see
```

### Policy Patterns

```sql
-- 1. Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 2. Users can update their own data
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 3. Users can insert their own data
CREATE POLICY "Users can create own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. Team members can view shared resources
CREATE POLICY "Team members can view projects"
  ON public.projects FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM team_members
      WHERE team_id = projects.team_id
    )
  );

-- 5. Role-based access
CREATE POLICY "Only admins can delete"
  ON public.tasks FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE user_id = auth.uid()
      AND role = 'admin'
      AND team_id = tasks.team_id
    )
  );

-- 6. Public read, authenticated write
CREATE POLICY "Anyone can read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can manage own posts"
  ON public.posts FOR ALL
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);
```

### auth.uid() Explained

```sql
-- auth.uid() extracts the user ID from the JWT token
-- Every request to PostgREST includes the JWT in Authorization header
-- RLS policies automatically evaluate auth.uid() per row

-- Check the JWT claims for advanced policies
auth.uid()               -- user UUID
auth.jwt() ->> 'role'    -- user role (anon, authenticated, service_role)
auth.jwt() ->> 'email'   -- user email
```

### Service Role Bypasses RLS

```typescript
// Server-side admin operations ONLY
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // NEVER in client code
);

// This bypasses ALL RLS policies — use with extreme caution
const { data } = await supabaseAdmin.from('users').select('*'); // Sees ALL rows regardless of policies
```

## Authentication

### Sign Up and Sign In

```typescript
// Sign up with email
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password-123',
  options: {
    data: {
      full_name: 'John Doe',
      role: 'user',
    },
  },
});

// Sign in with password
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password-123',
});

// Sign in with OAuth (Google, GitHub, etc.)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://your-app.com/auth/callback',
  },
});

// Sign out
await supabase.auth.signOut();
```

### Session Management

```typescript
// Get current session
const {
  data: { session },
} = await supabase.auth.getSession();

// Get current user
const {
  data: { user },
} = await supabase.auth.getUser();

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case 'SIGNED_IN':
      console.log('User signed in:', session?.user.email);
      break;
    case 'SIGNED_OUT':
      console.log('User signed out');
      break;
    case 'TOKEN_REFRESHED':
      console.log('Token refreshed');
      break;
    case 'USER_UPDATED':
      console.log('User data updated');
      break;
  }
});
```

### JWT Structure

```
Header:  { alg: "HS256", typ: "JWT" }
Payload: {
  sub: "uuid-of-user",        // auth.uid() returns this
  role: "authenticated",
  email: "user@example.com",
  app_metadata: { provider: "email", roles: ["user"] },
  user_metadata: { full_name: "John Doe" },
  iat: 1234567890,
  exp: 1234571490
}
```

## Database Operations

### CRUD Operations

```typescript
// SELECT with filters
const { data, error } = await supabase
  .from('products')
  .select('id, name, price, category(name)')
  .eq('is_active', true)
  .gte('price', 10)
  .lte('price', 100)
  .order('price', { ascending: true })
  .range(0, 19); // Pagination: offset 0, limit 20

// INSERT
const { data, error } = await supabase
  .from('products')
  .insert({
    name: 'Widget',
    price: 29.99,
    category_id: 'cat-123',
  })
  .select()
  .single();

// UPDATE
const { data, error } = await supabase
  .from('products')
  .update({ price: 24.99, is_active: true })
  .eq('id', 'prod-123')
  .select()
  .single();

// DELETE
const { error } = await supabase.from('products').delete().eq('id', 'prod-123');

// UPSERT (insert or update)
const { data, error } = await supabase
  .from('products')
  .upsert(
    { id: 'prod-123', name: 'Widget', price: 24.99 },
    { onConflict: 'id' }
  )
  .select()
  .single();
```

### Joins and Relationships

```typescript
// One-to-many: products with reviews
const { data } = await supabase
  .from('products')
  .select(
    `
    id,
    name,
    price,
    reviews (
      id,
      rating,
      comment,
      user:profiles (full_name)
    )
  `
  )
  .eq('id', 'prod-123');

// Many-to-many through junction table
const { data } = await supabase.from('products').select(`
    id,
    name,
    categories (id, name)
  `);
```

### RPC (Custom Functions)

```typescript
// Call a PostgreSQL function
const { data, error } = await supabase.rpc('get_product_stats', {
  product_id: 'prod-123',
  date_from: '2024-01-01',
  date_to: '2024-12-31',
});
```

```sql
-- The PostgreSQL function
CREATE OR REPLACE FUNCTION get_product_stats(
  product_id UUID,
  date_from DATE,
  date_to DATE
)
RETURNS TABLE (
  total_sales BIGINT,
  revenue NUMERIC,
  avg_rating NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_sales,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0)::NUMERIC AS revenue,
    COALESCE(AVG(r.rating), 0)::NUMERIC AS avg_rating
  FROM products p
  LEFT JOIN order_items oi ON oi.product_id = p.id
  LEFT JOIN reviews r ON r.product_id = p.id
  WHERE p.id = product_id
    AND oi.created_at BETWEEN date_from AND date_to;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Edge Functions (Deno Runtime)

### Basic Edge Function

```typescript
// supabase/functions/process-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    // Get auth context from Authorization header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');

    // Create client with user's token (respects RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    // Process request
    const { orderId } = await req.json();

    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', orderId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
```

### Deploy Edge Functions

```bash
# Deploy a single function
supabase functions deploy process-order

# Deploy with secrets
supabase secrets set STRIPE_SECRET_KEY=<your-stripe-live-key>

# Test locally
supabase functions serve process-order --env-file .env.local
```

## Real-Time Subscriptions

### Postgres Changes (Database Events)

```typescript
// Listen to INSERT events on a table
supabase
  .channel('public:orders')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'orders',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('New order:', payload.new);
    }
  )
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'orders',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Order updated:', payload.new);
    }
  )
  .subscribe();

// Cleanup
supabase.removeAllChannels();
```

### Presence (User State)

```typescript
const channel = supabase.channel('room:lobby', {
  config: { presence: { key: userId } },
});

channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    console.log('Online users:', Object.keys(state).length);
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({
        user: userId,
        online_at: new Date().toISOString(),
      });
    }
  });
```

## Storage

### File Operations

```typescript
// Upload a file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: 'image/png',
  });

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`);

// Get signed URL (for private buckets)
const { data } = await supabase.storage
  .from('private-documents')
  .createSignedUrl(`${userId}/contract.pdf`, 3600); // 1 hour

// List files
const { data } = await supabase.storage.from('avatars').list(userId, {
  limit: 100,
  sortBy: { column: 'created_at', order: 'desc' },
});

// Delete files
const { error } = await supabase.storage
  .from('avatars')
  .remove([`${userId}/old-avatar.png`]);
```

### Storage Policies

```sql
-- Users can upload their own avatars
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Anyone can view avatars
CREATE POLICY "Public avatar access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Users can delete only their own files
CREATE POLICY "Users can delete own files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Migrations

### CLI Workflow

```bash
# Initialize local development
supabase init

# Start local Supabase (PostgreSQL, Auth, Storage, Realtime)
supabase start

# Create a new migration
supabase migration new create_products_table

# Apply migrations locally
supabase db reset

# Push migrations to remote
supabase db push

# Generate types from schema
supabase gen types typescript --local > src/database.types.ts
```

### Migration File Example

```sql
-- supabase/migrations/20240101000000_create_products_table.sql

CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT unique_sku_per_tenant UNIQUE (tenant_id, sku)
);

-- Indexes
CREATE INDEX idx_products_tenant_active ON public.products (tenant_id, is_active);
CREATE INDEX idx_products_name_gin ON public.products USING GIN (to_tsvector('english', name));

-- Enable RLS (MANDATORY)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Tenant members can view products"
  ON public.products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tenant_members
      WHERE tenant_id = products.tenant_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Tenant admins can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.tenant_members
      WHERE tenant_id = products.tenant_id
      AND user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## Security Checklist

### Mandatory for Every Project

- [ ] **RLS enabled** on every public-facing table
- [ ] **No exposed `SERVICE_ROLE_KEY`** in client code
- [ ] **Validated inputs** on all Edge Functions
- [ ] **JWT verified** in every Edge Function
- [ ] **CORS configured** properly for your domains
- [ ] **Storage policies** set on all buckets
- [ ] **Anon key permissions** scoped to minimum necessary
- [ ] **Foreign keys** have ON DELETE actions defined
- [ ] **SQL injection prevention** — use parameterized queries in Edge Functions
- [ ] **Rate limiting** configured for public endpoints

## Anti-Patterns

| Anti-Pattern                                     | Problem                           | Fix                                         |
| ------------------------------------------------ | --------------------------------- | ------------------------------------------- |
| No RLS policies on tables                        | Any user can read/write all data  | Enable RLS + write policies for every table |
| Using `SERVICE_ROLE_KEY` in client code          | Complete database bypass          | Use `ANON_KEY` + RLS policies               |
| Exposing anon key in server code                 | Unnecessary risk                  | Anon key is for browsers only               |
| Not validating auth in Edge Functions            | Unauthenticated access            | Always verify JWT via `getUser()`           |
| Direct SQL without parameters in Edge Functions  | SQL injection                     | Use parameterized queries                   |
| Fetching all rows without pagination             | Memory exhaustion, slow queries   | Always use `.range()` or `.limit()`         |
| Using `storage.objects` without bucket_id filter | Cross-bucket data leaks           | Always filter by `bucket_id` in policies    |
| Not handling auth token refresh                  | Stale sessions, broken experience | Use `onAuthStateChange` to detect           |
| Creating policies with too-broad USING clauses   | Data leakage between users        | Always scope with `auth.uid()`              |
| Storing files without organizing by user/tenant  | Security and cleanup issues       | Use `{userId}/filename` path structure      |
