import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeatMilkHub",
  description: " ... Soon ... ",
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
        <Header /> 
        <main style={{ flexGrow: 1 }}> 
          <CartProvider>
          {children}
        </CartProvider> 
        </main>
        <Footer /> 
      </body>
    </html>
  );
}
