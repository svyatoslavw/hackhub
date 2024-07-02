"use client"

import { PostCard } from "@/entities/post/ui/PostCard"
import { useGetAllPostsQuery } from "@/shared/api/queries/useGetAllPostsQuery"
import { Skeleton } from "@/shared/ui/skeleton"

const ForumPage = () => {
  const { data, isLoading } = useGetAllPostsQuery()
  return (
    <>
      {isLoading && (
        <div className="flex flex-col gap-2 bg-[#f0f0f0] px-2 py-2 dark:bg-popover">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex flex-col gap-2 p-3" key={index}>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-[400px] rounded" />
                <Skeleton className="h-5 w-[100px] rounded" />
              </div>
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </div>
      )}
      <div className="flex h-full flex-col gap-2 rounded bg-[#f0f0f0] px-2 py-2 dark:bg-popover">
        {data?.length ? (
          data.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="flex h-20 items-center justify-center border py-2">Empty</div>
        )}
      </div>
    </>
  )
}

export { ForumPage }
