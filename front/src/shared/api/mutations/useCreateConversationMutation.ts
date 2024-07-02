import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { conversationService } from "@/entities/conversation/api/conversation.service"

type TCreateConversationMutation = UseMutationOptions<
  AxiosResponse<IConversation, any>,
  unknown,
  TypeCreateConversation,
  unknown
>

export const useCreateConversationMutation = (settings?: TCreateConversationMutation) =>
  useMutation<AxiosResponse<IConversation, any>, unknown, TypeCreateConversation, unknown>({
    mutationKey: ["create conversation"],
    mutationFn: (data: TypeCreateConversation) => conversationService.create(data),
    ...settings
  })
