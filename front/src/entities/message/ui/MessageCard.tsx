import { cn } from "@/shared/lib/utils"

const MessageCard = ({ message, profileId }: { message: IMessage; profileId: string }) => {
  const isCreator = (creatorId: string, profileId: string) => {
    return creatorId === profileId
  }
  return (
    <div
      key={message.id}
      className={cn("mb-2 flex px-2", {
        "justify-end": isCreator(message.creatorId, profileId),
        "justify-start": !isCreator(message.creatorId, profileId)
      })}
    >
      <div
        className={cn("rounded-lg px-3 py-2", {
          "bg-secondary text-foreground": !isCreator(message.creatorId, profileId),
          "bg-secondary ": isCreator(message.creatorId, profileId)
        })}
      >
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-300">
          {isCreator(message.creatorId, profileId) ? "You" : message.creator.login}
        </div>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    </div>
  )
}

export { MessageCard }
