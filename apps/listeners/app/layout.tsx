import type { Metadata, Viewport } from "next";
import "./globals.css";

const DESCRIPTION =
  "Hear what your neighborhood is playing. Vote on who wins. Back the artist you believe in. Unis is a hyper-local music platform opening soon in Harlem.";
const SHORT = "Hear what your neighborhood is playing. Vote on who wins. Back the artist you believe in.";

export const metadata: Metadata = {
  title: "Unis — Where music lives. Where you live.",
  description: DESCRIPTION,
  metadataBase: new URL("https://listeners.unismusic.com"),
  openGraph: {
    title: "Unis — Where music lives. Where you live.",
    description: SHORT,
    type: "website",
    url: "https://listeners.unismusic.com",
    siteName: "Unis",
    images: [{ url: "/og-listeners.jpg", width: 1200, height: 630, alt: "Unis for Listeners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unis — Where music lives. Where you live.",
    description: SHORT,
    images: ["/og-listeners.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Start the fonts and the hero loop downloading before anything else */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="preload" as="image" href="/hero-listener-poster.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
