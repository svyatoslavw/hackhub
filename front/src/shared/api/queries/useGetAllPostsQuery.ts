import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { postService } from "@/entities/post/api/post.service"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"

type TGetAllPostsQuery = UseQueryOptions<
  IPostResponse,
  unknown,
  IPostResponse,
  (string | TypeDataFilters)[]
> & {
  searchParams?: TypeDataFilters
}

export const useGetAllPostsQuery = (settings?: TGetAllPostsQuery) =>
  useQuery<IPostResponse, unknown, IPostResponse, (string | TypeDataFilters)[]>({
    queryKey: ["get all posts"],
    queryFn: () => postService.getAll(settings?.searchParams),
    ...settings
  })
