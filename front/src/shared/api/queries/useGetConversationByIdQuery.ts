import { conversationService } from "@/entities/conversation/api/conversation.service"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetConversationByUserIdQuery = UseQueryOptions<
  AxiosResponse<IConversation, unknown>,
  unknown,
  IConversation,
  any
>

export const useGetConversationByIdQuery = (id: string, settings?: TGetConversationByUserIdQuery) =>
  useQuery<AxiosResponse<IConversation, unknown>, unknown, IConversation, any>({
    queryKey: ["get conversation by id", id],
    queryFn: () => conversationService.getById(id),
    select: ({ data }) => data,
    ...settings
  })
