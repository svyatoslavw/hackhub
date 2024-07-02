import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { commentService } from "@/entities/comment/api/comment.service"

type TSendCommentMutation = UseMutationOptions<
  AxiosResponse<IComment, any>,
  unknown,
  TypeSendComment,
  unknown
>

export const useSendCommentMutation = (settings?: TSendCommentMutation) =>
  useMutation<AxiosResponse<IComment, any>, unknown, TypeSendComment, unknown>({
    mutationKey: ["create comment"],
    mutationFn: (data: TypeSendComment) => commentService.create(data),
    ...settings
  })
