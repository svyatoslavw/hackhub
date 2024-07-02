"use client"

import { FullPageProvider } from "@/shared/ui/providers"

export default function ProfileLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FullPageProvider>{children}</FullPageProvider>
}
