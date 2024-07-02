import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { postService } from "@/entities/post/api/post.service"

type TCreatePostMutation = UseMutationOptions<
  AxiosResponse<IPost, any>,
  unknown,
  TypeCreatePost,
  unknown
>

export const useCreatePostMutation = (settings?: TCreatePostMutation) =>
  useMutation<AxiosResponse<IPost, any>, unknown, TypeCreatePost, unknown>({
    mutationKey: ["create post"],
    mutationFn: (data: TypeCreatePost) => postService.create(data),
    ...settings
  })
