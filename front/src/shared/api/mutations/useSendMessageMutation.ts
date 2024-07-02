import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { messageService } from "@/entities/message/api/message.service"

type TSendMessageMutation = UseMutationOptions<
  AxiosResponse<IMessage, any>,
  unknown,
  TypeSendMessage,
  unknown
>

export const useSendMessageMutation = (settings?: TSendMessageMutation) =>
  useMutation<AxiosResponse<IMessage, any>, unknown, TypeSendMessage, unknown>({
    mutationKey: ["create message"],
    mutationFn: (data: TypeSendMessage) => messageService.create(data),
    ...settings
  })
