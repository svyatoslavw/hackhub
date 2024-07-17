"use client"

import { Button } from "@/shared/ui/button"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="xs:px-0 mx-auto flex h-screen max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-medium">500!</h1>
        <p className="text-lg font-medium">Internal Error</p>
      </div>
      <h3 className="text-sm font-medium">
        We are currently experiencing technical difficulties. We have identified the error and are
        working on fixing it and will have it resolved soon.
      </h3>
      <Button size={"sm"} className="w-36 max-w-lg" onClick={() => [reset()]}>
        Try Again
      </Button>
    </main>
  )
}
