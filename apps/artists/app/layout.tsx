import type { Metadata, Viewport } from "next";
import "./globals.css";

const DESCRIPTION =
  "Get heard where you live. Win your neighborhood. Get paid every time your supporters listen. Unis is a hyper-local music platform opening soon in Harlem.";
const SHORT =
  "Get heard where you live. Win your neighborhood. Get paid every time your supporters listen.";

export const metadata: Metadata = {
  title: "Unis for Artists — Where music lives.",
  description: DESCRIPTION,
  metadataBase: new URL("https://artists.unismusic.com"),
  openGraph: {
    title: "Unis for Artists — Where music lives.",
    description: SHORT,
    type: "website",
    url: "https://artists.unismusic.com",
    siteName: "Unis for Artists",
    images: [{ url: "/og-artists.jpg", width: 1200, height: 630, alt: "Unis for Artists" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unis for Artists — Where music lives.",
    description: SHORT,
    images: ["/og-artists.jpg"],
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
        <link rel="preload" as="image" href="/hero-artist-poster.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
