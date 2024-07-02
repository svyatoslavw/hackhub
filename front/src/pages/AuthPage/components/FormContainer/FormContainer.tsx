"use client"

import { Stage, useStage } from "../../contexts/useStage/useStage"
import { ConfirmationForm } from "../ConfirmationForm/ConfirmationForm"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterForm } from "../RegisterForm/RegisterForm"
import { SetConfirmationForm } from "../SetConfirmationForm/SetConfirmationForm"

const component: Record<Stage, React.ReactNode> = {
  login: <LoginForm />,
  register: <RegisterForm />,
  setConfirmation: <SetConfirmationForm />,
  confirmation: <ConfirmationForm />
}

const FormContainer = () => {
  const { stage } = useStage()

  return component[stage]
}

export { FormContainer }
