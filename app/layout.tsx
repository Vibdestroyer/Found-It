import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AmbientTheme from "../components/AmbientTheme";
import TopMenuTickerLogin from "../components/TopMenuTickerLogin";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SLB - Marmot Association",
  description: "Discover and support local businesses in your community.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AmbientTheme />

        <TopMenuTickerLogin />

        <div className="relative z-10 pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
