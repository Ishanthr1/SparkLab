import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { AuthDisabledNotice } from "@/components/layout/AuthDisabledNotice";
import { clerkEnabled } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  if (!clerkEnabled) return <AuthDisabledNotice />;
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <SignIn />
    </div>
  );
}
