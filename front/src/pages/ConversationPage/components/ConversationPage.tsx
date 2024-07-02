"use client"
import { MessageCard } from "@/entities/message/ui/MessageCard"
import { useProfile } from "@/entities/user/hooks/useProfile"
import { SendMessage } from "@/features"
import { useGetConversationByIdQuery } from "@/shared/api/queries/useGetConversationByIdQuery"
import { useIsTyping } from "@/shared/lib/hooks/useIsTyping"
import { useSocket } from "@/shared/lib/hooks/useSocket"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { ConversationFooter } from "./ConversationFooter"

const ConversationPage = ({ c }: { c: IConversation }) => {
  const [isTyping, setIsTyping] = useState(false)

  const queryClient = useQueryClient()
  const { profile } = useProfile()

  const { data: conversation, isLoading } = useGetConversationByIdQuery(c.id)

  const { socket } = useSocket()
  const { onTyping } = useIsTyping(socket, c.id)

  useEffect(() => {
    socket.emit("onConversationJoin", { conversationId: conversation?.id }),
      socket.on("userJoin", () => {
        console.warn("userJoin")
      })
    socket.on("userLeave", () => {
      console.warn("userLeave")
    })

    socket.on("onMessageUpdate", (message) => {
      console.warn("onMessageUpdate received")
      console.warn(message)
      queryClient.invalidateQueries({
        queryKey: ["get conversation by id", message.conversation.id]
      })
    })
    socket.on("onMessage", (payload: IMessage) => {
      console.warn("Message Received")
      queryClient.invalidateQueries({
        queryKey: ["get conversation by id", payload.conversation.id]
      })
    })
    socket.on("onConversation", (payload: IConversation) => {
      console.warn("Received onConversation Event")
    })
    socket.on("onMessageDelete", (payload) => {
      console.warn("Message Deleted")
    })
    socket.on("onTypingStart", () => {
      console.warn("onTypingStart: User has started typing...")
      setIsTyping(true)
    })
    socket.on("onTypingStop", () => {
      console.warn("onTypingStop: User has stopped typing...")
      setIsTyping(false)
    })
    return () => {
      socket.emit("onConversationLeave", { conversationI: conversation?.id })
      socket.off("userJoin")
      socket.off("userLeave")
      socket.off("onMessageUpdate")
      socket.off("connected")
      socket.off("onMessage")
      socket.off("onTypingStart")
      socket.off("onTypingStop")
      socket.off("onConversation")
      socket.off("onMessageDelete")
    }
  }, [conversation?.id, queryClient, socket])

  if (!profile) return

  return (
    <div className="cntnr relative w-full px-4 py-2">
      {isLoading || !conversation ? (
        <Loader2Icon className="mx-auto mt-10 animate-spin items-center" />
      ) : (
        conversation.messages.map((message) => (
          <MessageCard key={message.id} {...{ message, profileId: profile.id }} />
        ))
      )}
      <ConversationFooter {...{ isTyping, profileId: profile.id, conversation: conversation! }} />
      <SendMessage onTyping={onTyping} />
    </div>
  )
}

export { ConversationPage }
