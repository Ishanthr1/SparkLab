import type { Metadata } from "next";
import { Baloo_2, Lexend, Nunito } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const displayFont = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

// Lexend is designed for reading proficiency and is our dyslexia-friendly option.
const dyslexicFont = Lexend({
  variable: "--font-dyslexic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SparkBot — Learn Electronics Through Interactive Adventures",
    template: "%s | SparkBot",
  },
  description:
    "Build circuits, solve challenges, and become an engineer with SparkBot — an interactive electronics adventure for ages 11–14.",
};

// Apply saved accessibility settings before first paint so high-contrast and
// dyslexia-font users never see a flash of the default theme.
const settingsBootScript = `
try {
  var s = JSON.parse(localStorage.getItem("sparkbot.settings") || "{}");
  var d = document.documentElement;
  if (s.highContrast) d.setAttribute("data-contrast", "high");
  if (s.dyslexiaFont) d.setAttribute("data-font", "dyslexic");
  if (s.reducedMotion) d.setAttribute("data-motion", "reduced");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${dyslexicFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: settingsBootScript }} />
        <AppProviders>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
