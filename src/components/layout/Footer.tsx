import Link from "next/link";
import { SparkBot } from "@/components/mascot/SparkBot";

const columns = [
  {
    heading: "Learn",
    links: [
      { href: "/learn", label: "Learning path" },
      { href: "/simulator", label: "Circuit simulator" },
      { href: "/tutor", label: "Ask SparkBot" },
      { href: "/dashboard", label: "My progress" },
    ],
  },
  {
    heading: "Grown-ups",
    links: [
      { href: "/parents", label: "For parents" },
      { href: "/teacher", label: "For teachers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-extrabold text-spark-blue-deep">
            <SparkBot size={44} still />
            <span>
              Spark<span className="text-spark-orange">Bot</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-muted">
            Learn electronics through interactive adventures. Build circuits,
            solve challenges, and become an engineer — one spark at a time.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="font-display text-lg font-bold">{col.heading}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted underline-offset-4 hover:text-spark-blue hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-border py-4 text-center text-sm text-muted">
        Made with ⚡ for curious minds ages 11–14.
      </p>
    </footer>
  );
}
