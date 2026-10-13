import type { Metadata, Viewport } from "next";
import { Geist_Mono, Host_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const display = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-arabic",
});

const description =
  "Imperius turns the scattered data across your sales, stock and operations into organized knowledge you can ask, trust and act on.";

export const metadata: Metadata = {
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title: "Imperius: Turning chaos into knowledge",
  description,
  openGraph: {
    title: "Imperius: Turning chaos into knowledge",
    description,
    siteName: "Imperius",
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperius: Turning chaos into knowledge",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
