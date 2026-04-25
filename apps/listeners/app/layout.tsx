import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unis — Where music lives. Where you live.",
  description:
    "Discover the best music in your neighborhood. Decide who wins. Get paid every time you open the app. Unis is a hyper-local music platform built in Harlem.",
  metadataBase: new URL("https://unismusic.com"),
  openGraph: {
    title: "Unis — Where music lives. Where you live.",
    description:
      "Discover the best music in your neighborhood. Decide who wins. Get paid every time you open the app.",
    type: "website",
    url: "https://unismusic.com",
    siteName: "Unis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unis — Where music lives. Where you live.",
    description:
      "Discover the best music in your neighborhood. Decide who wins. Get paid every time you open the app.",
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
