import { useCreateCategoryMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const createCategorySchema = z
  .object({
    name: z.string().min(1, "Name must have than 5 characters").max(20),
    icon: z.string()
  })
  .required()

export const useCreateCategoryForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<TypeCreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      icon: ""
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateCategoryMutation({
    onSuccess() {
      toast.success("Successfully created!", { cancel: { label: "Close" } })
      queryClient.invalidateQueries({ queryKey: ["get all categories"] })
      setIsOpen(false)
    }
  })

  const onSubmit = form.handleSubmit((values: TypeCreateCategory) => {
    mutate(values)
  })

  return {
    form,
    functions: { onSubmit, setIsOpen },
    state: { isLoading: isPending, isOpen }
  }
}
