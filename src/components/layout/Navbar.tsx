"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { A11yMenu } from "@/components/layout/A11yMenu";
import { useProgress } from "@/components/providers/ProgressProvider";
import { SparkBot } from "@/components/mascot/SparkBot";
import { clerkEnabled } from "@/lib/auth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/simulator", label: "Simulator" },
  { href: "/tutor", label: "Ask SparkBot" },
  { href: "/dashboard", label: "My Progress" },
  { href: "/parents", label: "Parents" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, level, ready } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-surface/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-extrabold text-spark-blue-deep"
        >
          <SparkBot size={40} still mood="happy" />
          <span>
            Spark<span className="text-spark-orange">Bot</span>
          </span>
        </Link>

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 font-display font-semibold transition-colors",
                    active
                      ? "bg-spark-blue text-white"
                      : "text-foreground hover:bg-spark-blue-soft",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          {ready && state.xp > 0 && (
            <Link
              href="/dashboard"
              className="hidden items-center gap-1.5 rounded-full border-2 border-spark-yellow bg-spark-yellow-soft px-3 py-1.5 font-display text-sm font-bold text-foreground sm:flex"
              title={level.title}
            >
              <Zap aria-hidden="true" className="h-4 w-4 text-spark-orange" />
              <span>
                Lv {level.level} · {state.xp} XP
              </span>
            </Link>
          )}

          <A11yMenu />

          {clerkEnabled && (
            <>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="hidden rounded-full bg-spark-blue px-5 py-2 font-display font-bold text-white hover:bg-spark-blue-deep sm:block"
                  >
                    Sign in
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </>
          )}

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border text-foreground lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-nav"
          className="space-y-1 border-t border-border bg-surface px-4 py-3 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 font-display text-lg font-semibold",
                  pathname === link.href
                    ? "bg-spark-blue text-white"
                    : "hover:bg-spark-blue-soft",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
