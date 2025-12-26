# Supabase Authentication Fix

## Problem

The application uses **Firebase Authentication** for user management, but Supabase RLS (Row Level Security) policies are configured to check for **Supabase Auth** users. This causes 401 Unauthorized errors when trying to write to the database.

## Solution Options

### Option 1: Use Supabase Service Role Key (Recommended for Development)

Create a separate Supabase client with service role key for admin operations:

1. Get your Supabase Service Role Key from the Supabase Dashboard:
   - Go to Project Settings → API
   - Copy the `service_role` key (keep this secret!)

2. Create a new client file for admin operations:

```typescript
// src/integrations/supabase/adminClient.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// This client bypasses RLS - use only in admin operations
export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

3. Update admin managers to use `supabaseAdmin` instead of `supabase`:
   - `src/components/admin/PortfolioManager.tsx`
   - `src/components/admin/TestimonialsManager.tsx`
   - `src/components/admin/ServicesManager.tsx`
   - `src/utils/seedMockData.ts`

4. Add to `.env`:
```
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Option 2: Update RLS Policies to Allow Public Writes (Development Only)

⚠️ **WARNING: This disables security. Only use for development!**

Run this SQL in your Supabase SQL Editor:

```sql
-- Allow public writes for development
DROP POLICY IF EXISTS "Admins can manage portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

CREATE POLICY "Allow public writes for development"
  ON public.portfolio FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public writes for development"
  ON public.testimonials FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public writes for development"
  ON public.services FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Option 3: Sync Firebase Auth with Supabase Auth

Create a function that syncs Firebase Auth tokens with Supabase:

1. When a user logs in via Firebase, create a corresponding Supabase session
2. Use Supabase's `setSession()` method with a JWT token
3. This requires additional setup and token management

### Option 4: Use Supabase Auth Instead of Firebase Auth

Migrate the entire authentication system to use Supabase Auth instead of Firebase Auth. This is the most secure long-term solution but requires more refactoring.

## Recommended Approach

For now, use **Option 1** (Service Role Key) for development. For production, consider **Option 4** (migrate to Supabase Auth) for better security and integration.

