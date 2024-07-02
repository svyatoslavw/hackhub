import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { categoryService } from "@/entities/category/api"

type TCreateCategoryMutation = UseMutationOptions<
  AxiosResponse<ICategory, any>,
  unknown,
  TypeCreateCategory,
  unknown
>

export const useCreateCategoryMutation = (settings?: TCreateCategoryMutation) =>
  useMutation<AxiosResponse<ICategory, any>, unknown, TypeCreateCategory, unknown>({
    mutationKey: ["create category"],
    mutationFn: (data: TypeCreateCategory) => categoryService.create(data),
    ...settings
  })
