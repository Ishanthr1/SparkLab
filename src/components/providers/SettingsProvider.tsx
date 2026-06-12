"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Settings {
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  highContrast: false,
  dyslexiaFont: false,
  reducedMotion: false,
};

const STORAGE_KEY = "sparkbot.settings";

interface SettingsApi {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsApi | null>(null);

function applyToDocument(settings: Settings) {
  const d = document.documentElement;
  if (settings.highContrast) d.setAttribute("data-contrast", "high");
  else d.removeAttribute("data-contrast");
  if (settings.dyslexiaFont) d.setAttribute("data-font", "dyslexic");
  else d.removeAttribute("data-font");
  if (settings.reducedMotion) d.setAttribute("data-motion", "reduced");
  else d.removeAttribute("data-motion");
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // Settings must load from localStorage after hydration (the server render
    // can't know them), so this initial setState is unavoidable here.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch {
      // Corrupt storage: fall back to defaults.
    }
  }, []);

  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Storage full or unavailable: settings still apply for this session.
        }
        applyToDocument(next);
        return next;
      });
    },
    [],
  );

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsApi {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
