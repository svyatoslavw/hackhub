import Image from "next/image"
import { ConversationDots } from "./ConversationTypingDots"

interface ConversationFooterProps {
  isTyping: boolean
  profileId: string
  conversation: IConversation
}

const ConversationFooter = ({ isTyping, profileId, conversation }: ConversationFooterProps) => {
  if (!conversation) return

  return (
    <div className="absolute bottom-12 text-sm">
      {isTyping && (
        <div className="flex items-end gap-2">
          <Image
            alt="image"
            className="rounded-full"
            src={
              profileId === conversation.creator.id
                ? conversation.recipient.image
                : conversation.creator.image
            }
            width={24}
            height={24}
          />
          <ConversationDots />
        </div>
      )}
    </div>
  )
}

export { ConversationFooter }
