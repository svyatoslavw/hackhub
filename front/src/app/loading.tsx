import { Loader2Icon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Loader2Icon className="animate-spin" />
    </div>
  )
}
