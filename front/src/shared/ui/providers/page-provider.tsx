"use client"

import { useAnchor } from "@/shared/lib/hooks/useAnchor"
import { cn } from "@/shared/lib/utils"
import { Header, Sidebar } from "@/widgets"
import { ChevronUpIcon } from "lucide-react"

const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useAnchor()

  return (
    <div className="flex h-full min-h-screen flex-col gap-3">
      <Header />
      <div className="mx-auto flex h-full min-h-screen w-[1100px] gap-3">
        <Sidebar />
        <div className="bg-transparentease-in relative w-full rounded-xl dark:bg-transparent">
          {children}
          <div
            className={cn(
              "fixed left-0 top-0 z-10 flex h-screen items-center justify-center bg-[#ededed] px-4 py-2 transition-opacity duration-200 hover:opacity-70 dark:bg-[#211e1e]",
              {
                "pointer-events-none opacity-0": !isShow,
                "pointer-events-auto cursor-pointer opacity-100": isShow
              }
            )}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronUpIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export { PageProvider }
