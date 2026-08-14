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
  title: "ProdukDigital — Aplikasi Web Siap Pakai + Google Sheets",
  description:
    "Jual aplikasi web berbasis Google Apps Script: Aplikasi Zakat, Tabungan Sekolah, Sikurban & Kas Masjid. Source code lengkap + panduan deploy. Hosting gratis.",
  keywords: [
    "aplikasi zakat",
    "aplikasi tabungan sekolah",
    "aplikasi sikurban",
    "aplikasi kas masjid",
    "google apps script",
    "google sheets backend",
    "source code aplikasi",
    "aplikasi web gratis",
  ],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Aplikasi Web Siap Pakai + Google Sheets — ProdukDigital",
    description:
      "4 aplikasi web berbasis GAS: Zakat, Tabungan Sekolah, Sikurban & Kas Masjid. Source code + panduan deploy. Bayar sekali, pakai selamanya.",
    url: "https://produkdigital.vercel.app",
    siteName: "ProdukDigital",
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
