import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { allowIndexing, siteConfig, telHref } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { DevConfigNotice } from "@/components/layout/DevConfigNotice";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Combi Volkswagen bar & DJ, mini-discothèque pour vos événements`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#141110",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const tel = telHref();
  return (
    <html lang="fr" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <head>
        {/* Active les animations d'apparition uniquement si JavaScript est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only z-[70] rounded-full bg-cream px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <Header telHref={tel} phoneDisplay={siteConfig.contact.phoneDisplay || siteConfig.contact.phone} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCtaBar telHref={tel} />
        <DevConfigNotice />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
