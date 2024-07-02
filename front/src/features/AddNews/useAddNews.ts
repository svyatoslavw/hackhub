import { useAddNewsMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const addNewsSchema = z
  .object({
    content: z
      .string({ message: "Content must have than 1 character" })
      .min(8, "Name must have than 1 character")
  })
  .required()

export const useAddNews = () => {
  const form = useForm<TypeAddNews>({
    resolver: zodResolver(addNewsSchema),
    defaultValues: {}
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useAddNewsMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    }
  })

  const onSubmit = form.handleSubmit((values: TypeAddNews) => {
    mutate(values)
  })

  return {
    form,
    functions: {
      onSubmit
    },
    state: { isPending }
  }
}
