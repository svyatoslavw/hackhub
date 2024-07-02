import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { categoryService } from "@/entities/category/api"

type TCreateCategoryMutation = UseMutationOptions<
  AxiosResponse<ISubcategory, any>,
  unknown,
  TypeCreateSubcategory,
  unknown
>

export const useCreateSubcategoryMutation = (settings?: TCreateCategoryMutation) =>
  useMutation<AxiosResponse<ISubcategory, any>, unknown, TypeCreateSubcategory, unknown>({
    mutationKey: ["create subcategory"],
    mutationFn: (data: TypeCreateSubcategory) => categoryService.createSubcategory(data),
    ...settings
  })
