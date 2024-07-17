import { categoryService } from "@/entities/category/api"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetAllSubcategoriesQuery = UseQueryOptions<
  AxiosResponse<ISubcategory[], unknown>,
  unknown,
  ISubcategory[],
  any
>

export const useGetAllSubcategoriesQuery = (settings?: TGetAllSubcategoriesQuery) =>
  useQuery<AxiosResponse<ISubcategory[], unknown>, unknown, ISubcategory[], any>({
    queryKey: ["get all subcategories"],
    queryFn: () => categoryService.getAllSubcategories(),
    select: ({ data }) => data,
    ...settings
  })
