import type { Metadata } from "next";
import { Reddit_Sans, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/lib/motion";

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
  metadataBase: new URL("https://studio-m-pearl.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://studio-m-pearl.vercel.app",
    siteName: "Studio M — Soluções Visuais",
    title: "Studio M — Soluções Visuais",
    description:
      "Estúdio boutique que cria identidades visuais, experiências digitais e materiais impressos com direção estratégica.",
    images: [
      {
        url: "https://studio-m-pearl.vercel.app/assets/branding/logo-studiom.png",
        width: 1200,
        height: 630,
        alt: "Studio M — Soluções Visuais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio M — Soluções Visuais",
    description:
      "Identidades visuais, experiências digitais e materiais impressos com direção estratégica.",
    images: ["https://studio-m-pearl.vercel.app/assets/branding/logo-studiom.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://studio-m-pearl.vercel.app",
  },
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Studio M — Soluções Visuais",
              url: "https://studio-m-pearl.vercel.app",
              logo: "https://studio-m-pearl.vercel.app/assets/branding/logo-studiom.png",
              email: "contato@studiom.design",
              sameAs: ["https://wa.me/5511988884455"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "contato@studiom.design",
                  telephone: "+55-11-98888-4455",
                  availableLanguage: ["Portuguese", "English"],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${sora.variable} ${redditSans.variable} antialiased`}>
        <div className="relative min-h-dvh">
          <a
            href="#conteudo-principal"
            className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-primary/90 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-primary-foreground"
          >
            Ir para o conteúdo principal
          </a>
          {/* subtle brand gradient background */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.12]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,188,212,0.5),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(233,30,99,0.5),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(255,193,7,0.5),transparent_50%)]" />
          </div>
          <MotionProvider>
            <Header />
            <main id="conteudo-principal" className="mx-auto max-w-7xl px-4 py-10">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </div>
      </body>
    </html>
  );
}
