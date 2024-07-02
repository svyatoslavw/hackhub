"use client"

import React from "react"

interface IPollContext {
  isPoll: boolean
  setIsPoll: React.Dispatch<React.SetStateAction<boolean>>
}
interface IPollProvider {
  children: React.ReactNode
}

export const usePoll = () => React.useContext(PollContext)

export const PollContext = React.createContext<IPollContext>({
  isPoll: false,
  setIsPoll: () => {}
})

export const PollProvider: React.FC<IPollProvider> = ({ children }) => {
  const [isPoll, setIsPoll] = React.useState(false)

  const value = React.useMemo(() => ({ isPoll, setIsPoll }), [isPoll])

  return <PollContext.Provider value={value}>{children}</PollContext.Provider>
}
