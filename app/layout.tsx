import type { Metadata } from "next";
import { Reddit_Sans, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const redditSans = Reddit_Sans({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sora = Sora({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Studio M — Soluções Visuais",
    template: "%s | Studio M — Soluções Visuais",
  },
  description:
    "Studio M é um estúdio boutique de design que cria identidades visuais, experiências digitais e materiais impressos de alta fidelidade com direção estratégica.",
  metadataBase: new URL("https://studiom.design"),
};

// Prevent FOUC: apply stored theme before React hydrates
function ThemeScript() {
  const script = `
    try {
      const s = localStorage.getItem('theme');
      const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = s ? s === 'dark' : m;
      document.documentElement.classList.toggle('dark', dark);
    } catch {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${sora.variable} ${redditSans.variable} antialiased`}>
        <div className="relative min-h-dvh">
          {/* subtle brand gradient background */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.12]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,188,212,0.5),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(233,30,99,0.5),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(255,193,7,0.5),transparent_50%)]" />
          </div>
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
