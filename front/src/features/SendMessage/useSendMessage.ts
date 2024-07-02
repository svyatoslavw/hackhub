import { useSendMessageMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const sendCommentSchema = z
  .object({
    content: z.string().min(8, "Enter your comment"),
    conversationId: z.string()
  })
  .required()

export const useSendMessage = () => {
  const pathname = usePathname()

  const form = useForm<TypeSendMessage>({
    resolver: zodResolver(sendCommentSchema),
    defaultValues: {
      content: "",
      conversationId: pathname?.match(/\/conversations\/([a-zA-Z0-9]+)/)?.[1] || ""
    }
  })

  const queryClient = useQueryClient()
  const { mutate, isPending } = useSendMessageMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get conversation by id"] })
      toast.success("Message successfully sent!", { cancel: { label: "Close" } })
      form.reset()
    }
  })

  const onSubmit = form.handleSubmit((values: TypeSendMessage) => {
    mutate(values)
  })

  return {
    form,
    functions: { onSubmit },
    state: { isPending }
  }
}
