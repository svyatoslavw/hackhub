interface ConversationFooterProps {
  profileId: string
  conversation: IConversation
}

const ConversationHeader = ({ conversation, profileId }: ConversationFooterProps) => {
  if (!conversation) return

  const isCreator = (creatorId: string, profileId: string) => {
    return creatorId === profileId
  }
  return (
    <div className="mb-4 bg-foreground/[0.02] p-2 text-center text-sm text-zinc-800 dark:text-zinc-300">
      {isCreator(conversation.creator.id, profileId)
        ? conversation.recipient.login
        : conversation.creator.login}
    </div>
  )
}

export { ConversationHeader }
