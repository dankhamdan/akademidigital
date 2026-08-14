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
  title: "AkademiDigital — Template Website + Google Sheets Backend",
  description:
    "Jual template website profesional dengan Google Apps Script backend. Source code lengkap + panduan deploy. Deploy gratis di Vercel.",
  keywords: [
    "template website",
    "google sheets backend",
    "google apps script",
    "next.js template",
    "website tanpa server",
    "landing page template",
    "source code website",
  ],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Template Website + Google Sheets Backend — AkademiDigital",
    description:
      "Dapatkan source code website + panduan deploy. Hosting gratis di Vercel, data di Google Sheets. Bayar sekali, pakai selamanya.",
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
