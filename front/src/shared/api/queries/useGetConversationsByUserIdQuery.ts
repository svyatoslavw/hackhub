import { conversationService } from "@/entities/conversation/api/conversation.service"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TGetConversationsByUserIdQuery = UseQueryOptions<
  AxiosResponse<IConversation[], unknown>,
  unknown,
  IConversation[],
  any
>

export const useGetConversationsByUserIdQuery = (settings?: TGetConversationsByUserIdQuery) =>
  useQuery<AxiosResponse<IConversation[], unknown>, unknown, IConversation[], any>({
    queryKey: ["get conversations by user id"],
    queryFn: () => conversationService.getAllByUserId(),
    select: ({ data }) => data,
    ...settings
  })
