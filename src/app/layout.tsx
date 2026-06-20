import type { Metadata, Viewport } from "next";

import "./globals.css";
import { marcellus, spectral, notoDeva } from "@/lib/fonts";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ThemeScript from "@/components/ThemeScript";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe6cf" },
    { media: "(prefers-color-scheme: dark)", color: "#171109" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={site.locale}
      suppressHydrationWarning
      className={`${marcellus.variable} ${spectral.variable} ${notoDeva.variable}`}
    >
      <body>
        <ThemeScript />
        <SiteHeader />
        <main className="shell py-12 sm:py-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
