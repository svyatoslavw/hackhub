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
        "flex h-8 items-center justify-center gap-3 rounded-lg border px-4 py-1 text-xs text-black transition-all",
        {
          "border-red-500 bg-red-400/70 dark:border-red-500 dark:bg-red-900": !isConfirmed,
          "border-primary bg-primary/70 dark:border-primary dark:bg-primary/70": isConfirmed
        }
      )}
    >
      {isConfirmed ? (
        <>
          <CheckCircle2Icon size={18} />
          <span>Your account has been confirmed.</span>
        </>
      ) : (
        <>
          <AlertCircleIcon size={18} />
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
