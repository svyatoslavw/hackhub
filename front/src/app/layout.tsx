"use client"
import { Fira_Sans } from "next/font/google";

import { RootProvider } from "@/shared/ui/providers";
import "./globals.css";

import { GeistSans } from 'geist/font/sans';


const inter = Fira_Sans({ weight: ["400", "500", "600", "700"], subsets: ["cyrillic", "latin"] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className="font-mono">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
