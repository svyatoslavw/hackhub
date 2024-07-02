"use client"

import { PageProvider } from "@/shared/ui/providers"

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PageProvider>{children}</PageProvider>
}
