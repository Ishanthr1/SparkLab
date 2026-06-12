import { ClerkProvider } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/auth";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { ProgressSync } from "@/components/providers/ProgressSync";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  if (!clerkEnabled) {
    return (
      <SettingsProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </SettingsProvider>
    );
  }

  return (
    <ClerkProvider>
      <SettingsProvider>
        <ProgressProvider>
          {children}
          <ProgressSync />
        </ProgressProvider>
      </SettingsProvider>
    </ClerkProvider>
  );
}
