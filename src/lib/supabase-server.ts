import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the secret (service-role) key.
 * All tables are locked down with deny-all RLS; the only path to the
 * database is through our API routes, which check Clerk auth first.
 *
 * Returns null when Supabase isn't configured so callers can degrade
 * gracefully (progress then lives in localStorage only).
 */
export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) return null;
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
