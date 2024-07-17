import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { postService } from "@/entities/post/api/post.service"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"

type TGetSomePostsQuery = UseQueryOptions<
  IPostResponse,
  unknown,
  IPostResponse,
  (string | TypeDataFilters)[]
> & {
  searchParams?: TypeDataFilters
}

export const useGetSomePostsQuery = (settings?: TGetSomePostsQuery) =>
  useQuery<IPostResponse, unknown, IPostResponse, (string | TypeDataFilters)[]>({
    queryKey: ["get some posts"],
    queryFn: () => postService.getSome(settings?.searchParams),
    ...settings
  })
