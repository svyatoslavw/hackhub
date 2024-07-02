import { useEmailConfirmationMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useCredentials } from "../contexts/useCredentials/useCredentials"
import { useStage } from "../contexts/useStage/useStage"

export const LoginEmailSchema = z.object({
  credential: z.string().email({ message: "Invalid email address" })
})

export const LoginPasswordSchema = z.object({
  credential: z.string(),
  password: z.string().min(8, "Please enter your password")
})

export const useLoginForm = () => {
  const { setStage } = useStage()
  const { setCredential } = useCredentials()
  const { push } = useRouter()
  const [type, setType] = React.useState<"login" | "email">("login")

  const loginForm = useForm<IAuthEmailConfirmationForm>({
    resolver: zodResolver(type === "email" ? LoginEmailSchema : LoginPasswordSchema),
    defaultValues: {
      credential: "",
      password: ""
    }
  })

  const { mutate, isPending } = useEmailConfirmationMutation({
    onSuccess({ data }) {
      if (data && "accessToken" in data) {
        push("/")
        toast.success("Successfully login!", { cancel: { label: "Close" } })
      } else {
        type === "email" ? setStage("confirmation") : setStage("setConfirmation")
        loginForm.reset()
        toast.warning("Verify your account!", { cancel: { label: "Close" } })
      }
    }
  })

  const login = loginForm.watch("credential")

  React.useEffect(() => {
    const email = z.string().email()
    const isEmail = email.safeParse(login)

    setType(isEmail.success ? "email" : "login")
  }, [login])

  const onSubmit = loginForm.handleSubmit((values: IAuthEmailConfirmationForm) => {
    setCredential(values.credential)
    mutate(values)
  })

  const onSignup = () => setStage("register")

  return {
    state: {
      loading: isPending,
      isEmail: type === "email"
    },
    form: loginForm,
    functions: { onSubmit, onSignup }
  }
}
