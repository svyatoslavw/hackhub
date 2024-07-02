import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { newsService } from "@/entities/news/api/news.service"

type TCreatePollMutation = UseMutationOptions<
  AxiosResponse<INews, any>,
  unknown,
  TypeAddNews,
  unknown
>

export const useAddNewsMutation = (settings?: TCreatePollMutation) =>
  useMutation<AxiosResponse<INews, any>, unknown, TypeAddNews, unknown>({
    mutationKey: ["create poll"],
    mutationFn: (data: TypeAddNews) => newsService.create(data),
    ...settings
  })
