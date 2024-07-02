import { conversationService } from "@/entities/conversation/api/conversation.service"
import { ConversationPage } from "@/pages/ConversationPage"
import { cookies } from "next/headers"

type TypeParamPostSlug = {
  id: string
}

async function getConversation(params: TypeParamPostSlug, token: string) {
  const { data: conversation } = await conversationService.getByIdOnServer(
    params.id as string,
    token
  )

  return conversation
}

export default async function ConversationId({ params }: { params: TypeParamPostSlug }) {
  const token = cookies().get("accessToken")?.value
  const conversation = await getConversation(params, token || "")

  return <ConversationPage c={conversation} />
}
