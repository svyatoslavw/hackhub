import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select"
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react"
import { useTheme } from "next-themes"

const GeneralSettings = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">General</h1>
        <span className="text-sm">Configure your general preferences.</span>
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold">Theme switcher</h1>
        <span className="text-xs">
          Select your favorite theme to give the app a new look that matches your style.
        </span>
      </div>
      <Select onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-full" defaultValue={theme}>
          <SelectValue placeholder="Change theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="system">
              <div className="flex items-center gap-2">
                <SunMoonIcon size={16} />
                <span>System</span>
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center gap-2">
                <MoonIcon size={16} />
                <span>Dark</span>
              </div>
            </SelectItem>
            <SelectItem value="light">
              <div className="flex items-center gap-2">
                <SunIcon size={16} />
                <span>Light</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export { GeneralSettings }
