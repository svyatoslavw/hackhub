import { useCreatePollMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createPollSchema = z.object({
  question: z.string().min(1, "Вопрос обязателен"),
  options: z
    .array(z.object({ text: z.string().min(1, "Вариант ответа обязателен") }))
    .max(8, "Максимум 8 вариантов ответа")
})

export const useCreatePoll = () => {
  const form = useForm<TypeCreatePoll>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: "",
      options: [{ text: "" }, { text: "" }]
    }
  })

  const queryClient = useQueryClient()

  const { mutate } = useCreatePollMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      form.reset()
    }
  })

  const onSubmit = form.handleSubmit((values: z.infer<typeof createPollSchema>) => {
    mutate(values)
  })

  return {
    form,
    functions: {
      onSubmit
    }
  }
}
