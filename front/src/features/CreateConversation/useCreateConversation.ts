import { revalidateCoversations } from "@/app/actions"
import { useCreateConversationMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createCategorySchema = z
  .object({
    id: z.string(),
    content: z.string().min(8, "Enter your message")
  })
  .required()

export const useCreateConversationForm = (userId: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const { push } = useRouter()

  const form = useForm<TypeCreateConversation>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      id: userId,
      content: ""
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateConversationMutation({
    onSuccess({ data }) {
      setIsOpen(false)
      revalidateCoversations()
      queryClient.invalidateQueries({ queryKey: ["get conversations by user id"] })
      push(`/conversations/${data.id}`)
    }
  })

  const onSubmit = form.handleSubmit((values: TypeCreateConversation) => {
    mutate(values)
  })

  return {
    form,
    functions: {
      onSubmit,
      setIsOpen
    },
    state: { isPending, isOpen }
  }
}
