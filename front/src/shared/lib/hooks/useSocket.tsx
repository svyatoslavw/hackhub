"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Socket, io } from "socket.io-client"

interface ISocketContext {
  socket: Socket
}

const defaultSocket = io("http://localhost:4000", { withCredentials: true })

export const useSocket = () => useContext(SocketContext)

export const SocketContext = createContext<ISocketContext>({ socket: defaultSocket })

interface ISocketProviderProps {
  token: string
  children: React.ReactNode
}

export const SocketProvider: React.FC<ISocketProviderProps> = ({ token, children }) => {
  const [socket, setSocket] = useState<Socket>(defaultSocket)

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
      auth: {
        token
      }
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [token])

  const value = useMemo(() => ({ socket }), [socket])

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
