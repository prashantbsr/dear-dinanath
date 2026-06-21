import type { Metadata, Viewport } from "next";

import "./globals.css";
import { bricolage, plexSans, plexMono, tiroDeva } from "@/lib/fonts";
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
  // The default palette is Slate (light) for everyone on first paint; dark is an
  // explicit opt-in, so the browser chrome color tracks Slate's canvas.
  themeColor: "#f6f7f9",
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
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} ${tiroDeva.variable}`}
    >
      <body>
        <ThemeScript />
        <SiteHeader />
        <main className="shell flex-1 py-12 sm:py-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
