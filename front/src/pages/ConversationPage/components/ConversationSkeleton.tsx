import { Skeleton } from "@/shared/ui/skeleton"

const ConversationSkeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="mx-auto h-16 w-[220px]" />
      ))}
    </>
  )
}

export { ConversationSkeleton }
