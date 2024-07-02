import { PollProvider } from "@/pages/ProfilePage"
import React from "react"

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  return <PollProvider>{children}</PollProvider>
}
