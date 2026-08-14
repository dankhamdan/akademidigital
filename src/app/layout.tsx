import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AkademiDigital - Website Profesional dengan Google Sheets Backend",
  description:
    "Jasa pembuatan website modern yang terhubung langsung ke Google Sheets. Cepat, mudah, dan terjangkau.",
  keywords: [
    "website",
    "landing page",
    "Google Sheets",
    "Vercel",
    "web design",
    "bisnis online",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AkademiDigital - Website Profesional",
    description:
      "Website modern dengan Google Sheets backend. Cepat jadi, tanpa coding.",
    url: "https://akademidigital.vercel.app",
    siteName: "AkademiDigital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
