import { Skeleton } from "@/shared/ui/skeleton"

const ForumSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex flex-col gap-3 p-3" key={index}>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-[400px] rounded" />
            <Skeleton className="h-5 w-[100px] rounded" />
          </div>
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  )
}

export { ForumSkeleton }
