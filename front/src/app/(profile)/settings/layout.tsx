import { CredentialsProvider } from "@/pages/AuthPage"
import React from "react"

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  return <CredentialsProvider>{children}</CredentialsProvider>
}
