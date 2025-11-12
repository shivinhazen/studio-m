"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="group flex h-full items-center gap-3"
          aria-label="Studio M"
        >
          <Image
            src="/assets/branding/logo-studiom.png"
            alt="Studio M"
            width={260}
            height={70}
            priority
            sizes="(max-width: 768px) 180px, 260px"
            className="h-12 w-auto max-h-full transition-opacity duration-300 group-hover:opacity-100 md:h-14"
          />
        </Link>

        <nav className="hidden gap-1 md:flex">
          {routes.map((r) => {
            const isActive = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
                  isActive
                    ? "bg-accent/60 text-foreground"
                    : "hover:bg-accent/70 hover:text-foreground/90"
                )}
              >
                {r.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="menu-mobile"
        className={cn(
          "md:hidden border-t border-border/60",
          "origin-top overflow-hidden transition-[grid-template-rows] duration-300",
          open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="mx-auto max-w-6xl px-4 py-2 flex flex-col">
            {routes.map((r) => {
              const isActive = pathname === r.href;
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
                    isActive
                      ? "bg-accent/50 text-foreground"
                      : "hover:bg-accent/70"
                  )}
                >
                  {r.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
