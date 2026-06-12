import { SparkSays } from "@/components/mascot/SparkSays";
import { ButtonLink } from "@/components/ui/Button";

/** Shown on auth routes when Clerk keys are not configured. */
export function AuthDisabledNotice() {
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <SparkSays mood="explaining">
        Accounts are switched off right now, so you&apos;re exploring in guest
        mode — your progress is saved on this device. An adult can enable
        accounts by adding Clerk keys to the server settings.
      </SparkSays>
      <ButtonLink href="/learn">Keep learning as a guest</ButtonLink>
    </div>
  );
}
