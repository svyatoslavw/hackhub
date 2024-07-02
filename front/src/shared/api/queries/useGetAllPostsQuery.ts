import { postService } from "@/entities/post/api/post.service"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetAllPostsQuery = UseQueryOptions<AxiosResponse<IPost[], unknown>, unknown, IPost[], any>

export const useGetAllPostsQuery = (settings?: TGetAllPostsQuery) =>
  useQuery<AxiosResponse<IPost[], unknown>, unknown, IPost[], any>({
    queryKey: ["get all posts"],
    queryFn: () => postService.getAll(),
    select: ({ data }) => data,
    ...settings
  })
