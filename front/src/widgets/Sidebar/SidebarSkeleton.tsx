import { Skeleton } from "@/shared/ui/skeleton"

const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2 px-1 py-0.5">
          <Skeleton className="aspect-square h-8 w-8 rounded" />
          <Skeleton className="h-5 w-[120px] rounded" />
        </div>
      ))}
    </div>
  )
}

export { SidebarSkeleton }
