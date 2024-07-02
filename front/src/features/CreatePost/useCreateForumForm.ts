import { updatePost } from "@/entities/post/model/post.slice"
import { useCreatePostMutation } from "@/shared/api/mutations"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  content: z.string().min(10, "Content must be at least 2 characters."),
  subcategoryId: z.string().min(1, "Subcategory is required")
})

export const useCreateForumForm = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const subcategoryId = useAppSelector((state) => state.post.subcategoryId)

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      subcategoryId
    }
  })

  const { mutate, isPending } = useCreatePostMutation({
    onSuccess() {
      toast.success("Post successfully created!", { cancel: { label: "Close" } })
      dispatch(updatePost({ key: "subcategoryId", value: "" }))
      push("/")
    }
  })

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) => {
    mutate(values)
  })

  return {
    form,
    functions: { onSubmit },
    state: { isLoading: isPending, subcategoryId }
  }
}
