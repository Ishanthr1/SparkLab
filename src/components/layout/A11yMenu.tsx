"use client";

import { Accessibility } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useSettings, type Settings } from "@/components/providers/SettingsProvider";
import { cn } from "@/lib/utils";

const OPTIONS: { key: keyof Settings; label: string; hint: string }[] = [
  {
    key: "highContrast",
    label: "High contrast",
    hint: "Stronger colors and borders",
  },
  {
    key: "dyslexiaFont",
    label: "Easy-read font",
    hint: "Dyslexia-friendly letters and spacing",
  },
  {
    key: "reducedMotion",
    label: "Reduce motion",
    hint: "Turn off animations",
  },
];

/** Accessibility settings popover, available on every page from the navbar. */
export function A11yMenu() {
  const { settings, setSetting } = useSettings();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-surface text-spark-blue hover:bg-spark-blue-soft"
      >
        <Accessibility aria-hidden="true" className="h-6 w-6" />
        <span className="sr-only">Accessibility settings</span>
      </button>
      {open && (
        <div
          id={panelId}
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border-2 border-border bg-surface p-4 shadow-lg"
        >
          <h2 className="font-display text-lg font-bold">Reading & motion</h2>
          <ul className="mt-2 space-y-1">
            {OPTIONS.map((opt) => (
              <li key={opt.key}>
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-spark-blue-soft",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={settings[opt.key]}
                    onChange={(e) => setSetting(opt.key, e.target.checked)}
                    className="mt-1 h-5 w-5 accent-[var(--spark-blue)]"
                  />
                  <span>
                    <span className="block font-semibold">{opt.label}</span>
                    <span className="block text-sm text-muted">{opt.hint}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
