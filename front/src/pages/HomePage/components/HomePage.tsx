"use client"
import { PostCard } from "@/entities/post/ui/PostCard"
import { ForumFilter } from "@/pages/ForumPage/components/ForumFilter"
import { useGetSomePostsQuery } from "@/shared/api/queries/useGetSomePosts"
import { useFilter } from "@/shared/lib/hooks/useFilter"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { HomeSkeleton } from "./HomeSkeleton"

interface ForumPageProps {
  initialData: IPostResponse
  subcategories: ISubcategory[]
}

const HomePage = ({ initialData, subcategories }: ForumPageProps) => {
  const { isFilterUpdated, queryParams } = useFilter()

  const { data, isLoading, isFetching } = useGetSomePostsQuery({
    queryKey: ["get all posts", queryParams],
    searchParams: queryParams,
    initialData,
    enabled: isFilterUpdated
  })

  const isGlobalLoading = isLoading || isFetching

  return (
    <div className="flex flex-col gap-2">
      <ForumFilter subcategories={subcategories} />
      {isGlobalLoading ? (
        <HomeSkeleton />
      ) : (
        <div className="flex h-full flex-col gap-2 rounded-b-lg  px-2 py-2 ">
          {data && data.posts.map((post) => <PostCard key={post.id} post={post} />)}
          {!data?.length && !isGlobalLoading && (
            <div className="flex h-20 items-center justify-center border py-2">Empty</div>
          )}
        </div>
      )}

      <Link href="/forum" className="text-center text-sm">
        <Button variant={"link"}>See more...</Button>
      </Link>
    </div>
  )
}

export { HomePage }
