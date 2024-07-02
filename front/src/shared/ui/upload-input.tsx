import React from "react"
import { useUploadFile } from "../lib/hooks/useUploadFile"
import { cn } from "../lib/utils"

interface IUploadField extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload: (value: string | string[]) => void
  isMultiply?: boolean
  value?: string
  error?: string
}

const UploadInput = React.forwardRef<HTMLInputElement, IUploadField>(
  ({ className, isMultiply, onUpload, error, ...props }, ref) => {
    const { uploadFile } = useUploadFile(onUpload, isMultiply)

    return (
      <>
        <input
          onChange={uploadFile}
          type="file"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="relative z-50 mx-2 text-start text-xs text-red-500">{error}</span>
        )}
      </>
    )
  }
)
UploadInput.displayName = "UploadInput"

export { UploadInput }
