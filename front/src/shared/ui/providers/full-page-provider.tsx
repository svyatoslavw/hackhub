"use client"

import { Header } from "@/widgets"

const FullPageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh flex-col gap-3">
      <Header />
      <div className="sm:-w-[800px] mx-auto h-full w-[1100px] rounded-xl lg:w-[900px] xl:w-[900px] 2xl:w-[1100px]">
        {children}
      </div>
    </div>
  )
}

export { FullPageProvider }
