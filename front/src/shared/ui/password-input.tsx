import { EyeIcon, EyeOffIcon } from "lucide-react"
import { forwardRef, useState } from "react"

import { cn } from "@/shared/lib/utils"

import { Button } from "./button"
import type { InputProps } from "./input"
import { Input } from "./input"

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-10", className)}
            ref={ref}
            {...props}
          />
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
        {error && (
          <span className="relative z-50 mx-2 text-start text-xs text-red-500">{error}</span>
        )}
      </>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
