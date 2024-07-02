import { useEmailConfirmationMutation, usePhoneConfirmationMutation } from "@/shared/api/mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckedState } from "@radix-ui/react-checkbox"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCredentials } from "../contexts/useCredentials/useCredentials"
import { useStage } from "../contexts/useStage/useStage"

export const selectConfirmationPhoneSchema = z.object({
  credential: z.string()
})

export const selectConfirmationEmailSchema = z.object({
  credential: z.string().email()
})

const useSetConfirmationForm = () => {
  const { setStage } = useStage()
  const { setCredential } = useCredentials()
  const [formStage, setFormStage] = React.useState<"select" | "confirm">("select")
  const [type, setType] = React.useState<"phone" | "email">("phone")
  const [checked, setChecked] = React.useState<CheckedState>(false)

  const onSelectContinue = () => setFormStage("confirm")

  const selectConfirmationForm = useForm<IAuthPhoneConfirmationForm>({
    resolver: zodResolver(
      type === "email" ? selectConfirmationEmailSchema : selectConfirmationPhoneSchema
    )
  })
  const { mutate: mutateEmail, isPending: loadingEmail } = useEmailConfirmationMutation({
    onSuccess() {
      setStage("confirmation")
    }
  })
  const { mutate: mutatePhone, isPending: loadingPhone } = usePhoneConfirmationMutation({
    onSuccess() {
      setStage("confirmation")
    }
  })

  const onFormBack = () => {
    selectConfirmationForm.reset()
    setFormStage("select")
  }
  const onSubmit = selectConfirmationForm.handleSubmit(async (values) => {
    setCredential(values.credential)
    if (type === "email") {
      mutateEmail(values)
    } else {
      mutatePhone(values)
    }
  })

  return {
    form: selectConfirmationForm,
    state: {
      checked,
      type,
      formStage,
      loading: loadingEmail || loadingPhone
    },
    functions: { setChecked, setType, onSelectContinue, onFormBack, onSubmit }
  }
}

export { useSetConfirmationForm }
