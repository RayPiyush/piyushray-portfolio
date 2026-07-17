import Link from "next/link";
import { navItems, secondaryNavItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { Magnetic } from "@/components/motion/magnetic";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent font-mono text-xs font-bold text-accent-foreground">
                {profile.initials}
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {profile.subheadline}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social profiles">
              {socials.map((social) => (
                <li key={social.name}>
                  <Magnetic strength={0.35}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} — @${social.username}`}
                      className="glass flex size-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:border-strong hover:text-foreground"
                    >
                      <social.icon className="size-4" aria-hidden />
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer — explore">
            <h2 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — more">
            <h2 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">
              More
            </h2>
            <ul className="mt-4 space-y-2.5">
              {secondaryNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/feed.xml"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  RSS
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">Designed & built with intent · Next.js + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
