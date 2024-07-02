import { useCreateSubcategoryMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const createSubcategorySchema = z
  .object({
    name: z.string().min(1, "Name must have than 5 characters").max(20),
    categoryId: z.string()
  })
  .required()

export const useCreateSubcategoryForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<TypeCreateSubcategory>({
    resolver: zodResolver(createSubcategorySchema),
    defaultValues: {
      name: "",
      categoryId: ""
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateSubcategoryMutation({
    onSuccess() {
      toast.success("Successfully created!", { cancel: { label: "Close" } })
      queryClient.invalidateQueries({ queryKey: ["get all categories"] })
      setIsOpen(false)
    }
  })

  const onSubmit = form.handleSubmit((values: TypeCreateSubcategory) => {
    mutate(values)
  })

  return {
    form,
    functions: { onSubmit, setIsOpen },
    state: { isLoading: isPending, isOpen }
  }
}
