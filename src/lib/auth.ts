/**
 * Clerk is optional: without keys the app runs in "explorer mode" where
 * progress is stored on-device only. This flag gates every Clerk touchpoint.
 * NEXT_PUBLIC_ so client components can read it too (inlined at build time).
 */
export const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
