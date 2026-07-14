import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tyrone Xu | Mechanical Engineering Portfolio",
  description:
    "Mechanical engineering portfolio for Tyrone Xu, a Georgia Tech student focused on automotive systems, powertrain, fabrication, and design validation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Tyrone Xu | Mechanical Engineering Portfolio",
    description:
      "Georgia Tech mechanical engineering student building race vehicles, powertrain systems, and fabricated mechanisms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
