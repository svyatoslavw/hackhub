import { useRegisterMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useStage } from "../contexts/useStage/useStage"

export const RegisterSchema = z
  .object({
    email: z.string().min(1, "Enter your email").email("Invalid email"),
    login: z.string().min(1, "Enter your name").max(100),
    phone: z.string().min(7, "Enter your phone number"),
    password: z
      .string()
      .min(1, "Enter your password")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Confirmation is required")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match"
  })

interface IRegisterForm {
  email: string
  login: string
  phone: string
  password: string
  confirmPassword: string
}

export const useRegisterForm = () => {
  const { push } = useRouter()
  const { setStage } = useStage()

  const registerForm = useForm<IRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      login: "",
      phone: "",
      password: ""
    }
  })

  const { mutate, isPending } = useRegisterMutation({
    onSuccess() {
      toast.success("Account created successfully!", { cancel: { label: "Close" } })
      push("/profile")
    }
  })

  const onSubmit = registerForm.handleSubmit((values: IRegisterForm) => {
    const { confirmPassword, ...rest } = values
    mutate(rest)
  })

  const onSignin = () => setStage("login")

  return {
    state: {
      loading: isPending
    },
    form: registerForm,
    functions: { onSubmit, onSignin }
  }
}
