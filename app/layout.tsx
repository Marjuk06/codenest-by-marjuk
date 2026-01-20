import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CodeNest by Marjuk | Software Built for the Future",
  description: "Free and premium desktop applications, browser extensions, and web tools by Marjuk Amin. Download innovative software solutions.",
  keywords: ["software", "apps", "tools", "extensions", "Marjuk Amin", "CodeNest"],
  authors: [{ name: "Marjuk Amin" }],
  creator: "Marjuk Amin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codenestbymarjuk.com",
    siteName: "CodeNest by Marjuk",
    title: "CodeNest by Marjuk | Software Built for the Future",
    description: "Free and premium desktop applications, browser extensions, and web tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
