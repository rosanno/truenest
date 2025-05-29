import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { QueryProvider } from "@/providers/query-provider";

import { Toaster } from "@/components/ui/sonner";

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
  title: {
    default: "Truenest",
    template: "Truenest | %s",
  },
  description: "Discover your ideal home with Truenest – browse verified property listings tailored to your lifestyle and budget.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <main>{children}</main>
            <Toaster richColors position="top-right" />
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
