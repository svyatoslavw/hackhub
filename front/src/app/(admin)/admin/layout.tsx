"use client"

import { FullPageProvider } from "@/shared/ui/providers"

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FullPageProvider>{children}</FullPageProvider>
}
