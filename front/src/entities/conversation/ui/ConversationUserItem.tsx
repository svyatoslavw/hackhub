import Image from "next/image"
import Link from "next/link"

interface ConversationUserItemProps {
  conversation: IConversation
  profileId: string
}

const getConversationImage = (profileId: string, conversation: IConversation) => {
  return profileId === conversation.creator.id
    ? conversation.recipient.image
    : conversation.creator.image
}

const getConversationLogin = (profileId: string, conversation: IConversation) => {
  return profileId === conversation.creator.id
    ? conversation.recipient.login
    : conversation.creator.login
}

const ConversationUserItem = ({ conversation, profileId }: ConversationUserItemProps) => {
  return (
    <Link
      href={`/conversations/${conversation.id}`}
      id={conversation.id}
      className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-secondary"
    >
      <div className="flex items-center">
        <Image
          alt="image"
          className="rounded-full"
          src={getConversationImage(profileId, conversation)}
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium">{getConversationLogin(profileId, conversation)}</h4>
        <div
          className="line-clamp-2 w-full text-xs text-gray-300"
          dangerouslySetInnerHTML={{
            __html: conversation?.messages[conversation.messages.length - 1]?.content || ""
          }}
        />
      </div>
    </Link>
  )
}

export { ConversationUserItem }
