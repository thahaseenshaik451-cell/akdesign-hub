// Admin Supabase client that bypasses RLS
// Use this ONLY for admin operations when using Firebase Auth
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// This client bypasses RLS using service role key
// ⚠️ WARNING: Only use this in admin components, never expose to client-side public code
export const supabaseAdmin = SUPABASE_SERVICE_ROLE_KEY
  ? createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Fallback: if service role key is not set, use regular client (will fail with RLS)
// This allows the app to work but admin operations will fail until service role key is configured
export const getSupabaseAdmin = () => {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }
  
  // Fallback to regular client (will have RLS restrictions)
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set. Admin operations may fail due to RLS policies.');
  const { supabase } = require('./client');
  return supabase;
};

