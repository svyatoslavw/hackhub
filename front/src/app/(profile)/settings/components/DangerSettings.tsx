import { Button } from "@/shared/ui/button"
import { UserRoundXIcon } from "lucide-react"

const DangerSettings = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Danger zone</h1>
        <span className="max-w-md text-xs">
          This section contains actions that may have severe consequences for your account or data.
        </span>
      </div>

      <Button className="max-w-40 text-xs" size={"sm"} variant={"destructive"}>
        <UserRoundXIcon size={18} className="mr-1" />
        Delete account
      </Button>
    </div>
  )
}

export { DangerSettings }
