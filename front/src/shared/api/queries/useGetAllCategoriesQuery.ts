import { categoryService } from "@/entities/category/api"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetAllCategoriesQuery = UseQueryOptions<
  AxiosResponse<ICategory[], unknown>,
  unknown,
  ICategory[],
  any
>

export const useGetAllCategoriesQuery = (settings?: TGetAllCategoriesQuery) =>
  useQuery<AxiosResponse<ICategory[], unknown>, unknown, ICategory[], any>({
    queryKey: ["get all categories"],
    queryFn: () => categoryService.getAll(),
    select: ({ data }) => data,
    ...settings
  })
