import { Button } from "@/shared/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp"
import { Loader2Icon } from "lucide-react"

import { Controller } from "react-hook-form"
import { useConfirmationForm } from "../../hooks/useConfirmationForm"

const ConfirmationForm = ({
  isProfileConfirmation = false
}: {
  isProfileConfirmation?: boolean
}) => {
  const { form, functions, state } = useConfirmationForm()

  const onSubmit = isProfileConfirmation ? functions.onProfileConfirm : functions.onLogin

  return (
    <div className="xs:w-[230px] mx-auto flex flex-col justify-center space-y-6 rounded-xl px-5 sm:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Two factor authentication</h1>
        <p className="text-sm text-muted-foreground">We sent you a code to your</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-3">
        <div className="mx-auto">
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            {state.loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
          {!!state.seconds && (
            <div>
              <p className="text-center text-sm text-muted-foreground">
                try again after {state.seconds} seconds
              </p>
            </div>
          )}
          {!state.seconds && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={functions.onConfirmation}
              disabled={state.loading}
            >
              {state.loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Send code
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export { ConfirmationForm }
