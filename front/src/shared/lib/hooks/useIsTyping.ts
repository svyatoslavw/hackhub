import { useRef, useState } from "react"
import { Socket } from "socket.io-client"

export const useIsTyping = (socket: Socket, id: string) => {
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const onTyping = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (isTyping) {
      timerRef.current = setTimeout(() => {
        socket.emit("onTypingStop", { conversationId: id })
        setIsTyping(false)
      }, 2000)
    } else {
      setIsTyping(true)
      socket.emit("onTypingStart", { conversationId: id })
    }
  }

  return {
    onTyping
  }
}
