import type { Metadata } from "next";
import { Oswald, Quattrocento, Montserrat, Hind } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';
import WhatsAppButton from "@/components/WhatsAppButton";

const oswald = Oswald({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-oswald',
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-quattrocento',
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
});

const hind = Hind({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind',
});

export const metadata: Metadata = {
  title: "Website Resmi Desa Gaya Baru",
  description: "Website Resmi Desa Gaya Baru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${quattrocento.variable} ${montserrat.variable} ${hind.variable} antialiased`} suppressHydrationWarning={true}
      >
        <Header />
        <NextTopLoader
          color="#FFFFFF"
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFFFFF, 0 0 5px #FFFFFF" 
        />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
