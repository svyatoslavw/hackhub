"use client"
import { FullPageProvider } from "@/shared/ui/providers"
import React from "react"

export default function ForumLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FullPageProvider>{children}</FullPageProvider>
}
