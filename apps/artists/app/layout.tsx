import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unis for Artists — Where music lives.",
  description:
    "Keep 100% of your music. Win your neighborhood. Get paid by fans who never press play. Unis is a hyper-local music platform built in Harlem.",
  metadataBase: new URL("https://artists.unismusic.com"),
  openGraph: {
    title: "Unis for Artists — Where music lives.",
    description:
      "Keep 100% of your music. Win your neighborhood. Get paid by fans who never press play.",
    type: "website",
    url: "https://artists.unismusic.com",
    siteName: "Unis for Artists",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unis for Artists — Where music lives.",
    description:
      "Keep 100% of your music. Win your neighborhood. Get paid by fans who never press play.",
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
      <body>{children}</body>
    </html>
  );
}
