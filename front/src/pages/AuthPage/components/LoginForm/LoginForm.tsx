"use client"

import { Loader2Icon } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { GoogleIcon } from "@/shared/ui/icons/GoogleIcon"
import { Input } from "@/shared/ui/input"

import { GithubIcon } from "@/shared/ui/icons/GithubIcon"
import { PasswordInput } from "@/shared/ui/password-input"
import { useLoginForm } from "../../hooks/useLoginForm"
import { AuthButton } from "../AuthButton/AuthButton"
import { Footer } from "../Footer/Footer"

const LoginForm = () => {
  const { form, functions, state } = useLoginForm()

  return (
    <div className="xs:w-[230px] mx-auto flex flex-col justify-center space-y-6 rounded-xl px-5 sm:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <h3 className="text-sm">Enter your email and password</h3>
      </div>
      <form onSubmit={functions.onSubmit} className="flex flex-col gap-4">
        <Input
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="your email or login"
          error={form.formState.errors.credential?.message}
          {...form.register("credential")}
        />
        {!state.isEmail && (
          <PasswordInput
            id="password"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            error={form.formState.errors.password?.message}
            placeholder="secret password"
            {...form.register("password")}
          />
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={state.loading || !form.formState.isDirty}
        >
          {state.loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
        <div
          onClick={functions.onSignup}
          className="mx-auto cursor-pointer text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          create your account
        </div>
      </form>
      {/*  */}
      <div className="mx-auto flex w-full items-center justify-evenly text-xs before:mr-4 before:block before:h-px before:flex-grow before:bg-secondary after:ml-4 after:block after:h-px after:flex-grow after:bg-secondary">
        OR CONTINUE WITH
      </div>
      <div className="flex flex-col gap-3">
        <AuthButton credential="google" text="google">
          <GoogleIcon className="size-5" />
        </AuthButton>
        <AuthButton credential="github" text="github">
          <GithubIcon className="size-5" />
        </AuthButton>
      </div>
      <Footer />
    </div>
  )
}

export { LoginForm }
