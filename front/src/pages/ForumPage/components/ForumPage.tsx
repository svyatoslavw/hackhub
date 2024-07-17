"use client"
import { PostCard } from "@/entities/post/ui/PostCard"
import { useGetAllPostsQuery } from "@/shared/api/queries"
import { useFilter } from "@/shared/lib/hooks/useFilter"
import { getPageNumbers } from "@/shared/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/shared/ui/pagination"
import { ForumFilter } from "./ForumFilter"
import { ForumSkeleton } from "./ForumSkeleton"

interface ForumPageProps {
  initialData: IPostResponse
  subcategories: ISubcategory[]
}

const ForumPage = ({ initialData, subcategories }: ForumPageProps) => {
  const { isFilterUpdated, queryParams, updateQueryParams } = useFilter()

  const { data, isLoading, isFetching } = useGetAllPostsQuery({
    queryKey: ["get all posts", queryParams],
    searchParams: queryParams,
    initialData,
    enabled: isFilterUpdated
  })

  const isGlobalLoading = isLoading || isFetching

  const totalPages = data ? Math.ceil(data.length / +queryParams.perPage) : 1
  const pages = getPageNumbers(+queryParams.page, totalPages)

  return (
    <div className="flex flex-col gap-2">
      <ForumFilter subcategories={subcategories} />
      {isGlobalLoading ? (
        <ForumSkeleton />
      ) : (
        <div className="flex h-full flex-col gap-2 rounded-b-lg  px-2 py-2 ">
          {data && data.posts.map((post) => <PostCard key={post.id} post={post} />)}
          {!data?.length && !isGlobalLoading && (
            <div className="flex h-20 items-center justify-center border py-2">Empty</div>
          )}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={+queryParams.page === 1}
              onClick={() => updateQueryParams("page", String(+queryParams.page - 1))}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === +queryParams.page}
                onClick={() => updateQueryParams("page", String(page))}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {!pages.includes(totalPages) && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => updateQueryParams("page", String(totalPages))}>
                  {data && Math.ceil(data.length / +queryParams.perPage)}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              disabled={+queryParams.page === totalPages}
              onClick={() => updateQueryParams("page", String(+queryParams.page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export { ForumPage }
