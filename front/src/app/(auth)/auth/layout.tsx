"use client"

import { FullPageProvider } from "@/shared/ui/providers"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <FullPageProvider>{children}</FullPageProvider>
}
