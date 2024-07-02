import { useCredentials } from "@/pages/AuthPage"
import { useEmailConfirmationMutation } from "@/shared/api/mutations"
import { cn } from "@/shared/lib/utils"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import Link from "next/link"

interface IConfirmationAlertProps {
  email: string
  isConfirmed: boolean
}

const ConfirmationAlert = ({ email, isConfirmed }: IConfirmationAlertProps) => {
  const { mutate } = useEmailConfirmationMutation()
  const { setCredential } = useCredentials()
  const handleConfirmation = () => {
    setCredential(email)
    mutate({ credential: email })
  }
  return (
    <div
      className={cn(
        "col-span-full flex h-10 items-center justify-center gap-3 rounded-lg border px-6 py-2 text-sm transition-all",
        {
          "border-red-500 bg-red-400/70 dark:border-red-500 dark:bg-red-900": !isConfirmed,
          "border-green-500 bg-green-400/70 dark:border-green-600 dark:bg-green-800": isConfirmed
        }
      )}
    >
      {isConfirmed ? (
        <>
          <CheckCircle2Icon />
          <span>Your account has been confirmed.</span>
        </>
      ) : (
        <>
          <AlertCircleIcon />
          <span>You must confirm account via email.</span>
        </>
      )}
      {!isConfirmed && (
        <Link
          href={"/settings/confirmation"}
          onClick={handleConfirmation}
          className="rounded bg-primary px-3 py-1 text-sm text-secondary transition hover:bg-zinc-700 dark:hover:bg-zinc-200"
        >
          Confirm
        </Link>
      )}
    </div>
  )
}

export { ConfirmationAlert }
