import { ConversationSidebar } from "@/pages/ConversationPage"
import { SocketProvider } from "@/shared/lib/hooks/useSocket"
import { FullPageProvider } from "@/shared/ui/providers"
import { cookies } from "next/headers"
import React from "react"

export default function ConversationLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("accessToken")?.value

  return (
    <SocketProvider token={token!}>
      <FullPageProvider>
        <div className="cntnr flex w-full rounded-lg bg-popover dark:bg-popover">
          <ConversationSidebar />
          <div className="w-full">{children}</div>
        </div>
      </FullPageProvider>
    </SocketProvider>
  )
}
