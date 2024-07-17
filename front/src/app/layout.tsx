"use client"

import { RootProvider } from "@/shared/ui/providers"
import "./globals.css"

import { GeistSans } from "geist/font/sans"

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
