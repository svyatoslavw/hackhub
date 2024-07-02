import { Button } from "@/shared/ui/button"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { Loader2Icon } from "lucide-react"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { useSetConfirmationForm } from "../../hooks/useSetConfirmationForm"

const SetConfirmationForm = () => {
  const { state, functions, form } = useSetConfirmationForm()

  return (
    <div className="xs:w-[230px] mx-auto flex flex-col justify-center space-y-6 rounded-xl px-5 sm:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
      {state.formStage === "select" && (
        <>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Choose variant for verification code
            </h1>
            <p className="text-sm text-muted-foreground">We sent you a code to your {state.type}</p>
          </div>

          <RadioGroup
            className="flex flex-col space-y-2"
            defaultValue={state.type}
            onValueChange={(value: "phone" | "email") => functions.setType(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="size-5 border-2" value="email" id="email" />
              <Label htmlFor="email">email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="size-5 border-2" value="phone" id="phone" />
              <Label htmlFor="phone">phone</Label>
            </div>
          </RadioGroup>

          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms"
              checked={state.checked}
              onCheckedChange={(checked) => functions.setChecked(checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-xs text-muted-foreground">
                You agree to our{" "}
                <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <Button className="w-full" disabled={!state.checked} onClick={functions.onSelectContinue}>
            Continue
          </Button>
        </>
      )}
      {state.formStage === "confirm" && (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Two factor authentication</h1>
            <p className="text-sm text-muted-foreground">We sent you a code to your {state.type}</p>
          </div>
          <div className="grid gap-2">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                functions.onSubmit()
              }}
              className="space-y-4"
            >
              <>
                {state.type === "email" && (
                  <Input
                    id="credential-email"
                    autoFocus
                    autoComplete="email"
                    autoCorrect="off"
                    placeholder="write email"
                    {...form.register("credential")}
                    error={form.formState.errors.credential?.message}
                  />
                )}
                {state.type === "phone" && (
                  <Controller
                    control={form.control}
                    name="credential"
                    render={({ field }) => (
                      <PatternFormat
                        format="+380#########"
                        allowEmptyFormatting
                        customInput={Input}
                        {...field}
                      />
                    )}
                  />
                )}
              </>
              <Button type="submit" className="w-full" disabled={state.loading}>
                {state.loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                Confirm
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={state.loading}
                onClick={functions.onFormBack}
              >
                {state.loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                Back
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export { SetConfirmationForm }
