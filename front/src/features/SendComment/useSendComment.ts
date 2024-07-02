import { revalidateComments } from "@/app/actions"
import { useSendCommentMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const sendCommentSchema = z
  .object({
    content: z.string().min(8, "Enter your comment"),
    postId: z.string()
  })
  .required()

export const useSendComment = (pathname: string) => {
  const form = useForm<TypeSendComment>({
    resolver: zodResolver(sendCommentSchema),
    defaultValues: {
      content: "",
      postId: pathname?.match(/\/forum\/([a-zA-Z0-9]+)/)?.[1] || ""
    }
  })

  const { mutate, isPending } = useSendCommentMutation({
    onSuccess() {
      toast.success("Comment successfully created!", { cancel: { label: "Close" } })
      form.reset()
    }
  })

  const onSubmit = form.handleSubmit((values: TypeSendComment) => {
    mutate(values)
    revalidateComments()
  })

  return {
    form,
    functions: { onSubmit },
    state: { isPending }
  }
}
