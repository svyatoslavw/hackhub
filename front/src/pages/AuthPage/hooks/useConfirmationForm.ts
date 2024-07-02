import {
  useEmailConfirmationMutation,
  useLoginMutation,
  usePhoneConfirmationMutation,
  useProfileConfirmationMutation
} from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useCredentials } from "../contexts/useCredentials/useCredentials"

export const ConfirmationSchema = z.object({
  credential: z.string(),
  code: z.string().min(6, "Please enter your code")
})

const useConfirmationForm = () => {
  const { push } = useRouter()
  const { credential } = useCredentials()
  const countDownRef = React.useRef<NodeJS.Timeout>()
  const [seconds, setSeconds] = React.useState(20)

  React.useEffect(() => {
    if (!seconds) return
    countDownRef.current = setInterval(() => setSeconds((seconds) => seconds - 1), 1000)
    return () => clearInterval(countDownRef.current)
  }, [seconds])

  React.useEffect(() => {
    if (!seconds) clearInterval(countDownRef.current)
  }, [seconds])

  const confirmationForm = useForm<IAuthEmailLoginForm>({
    resolver: zodResolver(ConfirmationSchema),
    defaultValues: {
      credential: credential,
      code: ""
    }
  })

  const { mutate: mutateLogin, isPending: loadingLogin } = useLoginMutation({
    onSuccess() {
      push("/")
      toast.success("Successfully login!", { cancel: { label: "Close" } })
    }
  })

  const { mutate: mutateConfirm, isPending: loadingConfirm } = useProfileConfirmationMutation({
    onSuccess() {
      push("/")
      toast.success("Profile successfully confirmed!", { cancel: { label: "Close" } })
    }
  })

  const { mutate: mutateEmail, isPending: loadingEmail } = useEmailConfirmationMutation()
  const { mutate: mutatePhone, isPending: loadingPhone } = usePhoneConfirmationMutation()

  const onLogin = confirmationForm.handleSubmit((values: IAuthEmailLoginForm) => {
    mutateLogin(values)
  })

  const onProfileConfirm = confirmationForm.handleSubmit((values: IAuthEmailLoginForm) => {
    mutateConfirm(values)
  })

  const onConfirmation = () => {
    credential && credential.startsWith("+")
      ? mutatePhone({ credential: credential })
      : mutateEmail({ credential: credential || "" })
  }

  return {
    state: {
      loading: loadingConfirm || loadingEmail || loadingPhone || loadingLogin,
      seconds
    },
    form: confirmationForm,
    functions: { onLogin, onProfileConfirm, onConfirmation }
  }
}

export { useConfirmationForm }
