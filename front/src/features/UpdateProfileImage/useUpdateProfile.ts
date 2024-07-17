import { useUpdateProfileMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const updateProfileSchema = z
  .object({
    image: z.string().optional(),
    login: z.string().optional()
  })
  .required()

export const useUpdateProfileForm = ({ profile }: { profile: IUser }) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      image: profile.image,
      login: profile.login
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useUpdateProfileMutation({
    onSuccess() {
      toast.success("Successfully updated!", { cancel: { label: "Close" } })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsOpen(false)
    }
  })

  const onSubmit = form.handleSubmit((values: TypeUpdateProfile) => {
    mutate(values)
  })

  return {
    form,
    functions: { onSubmit, setIsOpen },
    state: { isLoading: isPending, isOpen }
  }
}
