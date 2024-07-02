import { CredentialsProvider, StageProvider, FormContainer } from "@/pages/AuthPage"

export default function Auth() {
  return (
    <CredentialsProvider>
      <StageProvider>
        <FormContainer />
      </StageProvider>
    </CredentialsProvider>
  )
}
