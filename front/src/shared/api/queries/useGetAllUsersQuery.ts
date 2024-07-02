import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { userService } from "@/entities/user/api/user.service"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetAllPostsQuery = UseQueryOptions<AxiosResponse<IUser[], unknown>, unknown, IUser[], any>

export const useGetAllUsersQuery = (queryParams: TypeDataFilters, settings?: TGetAllPostsQuery) =>
  useQuery<AxiosResponse<IUser[], unknown>, unknown, IUser[], any>({
    queryKey: ["get all users", queryParams],
    queryFn: () => userService.getAllUsers(queryParams),
    initialData: undefined,
    select: ({ data }) => data,
    ...settings
  })
