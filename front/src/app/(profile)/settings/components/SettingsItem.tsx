import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useRef } from "react"
import { toast } from "sonner"

interface ISettingsItem {
  name: string
  value: string
}
const SettingsItem = ({ name, value }: ISettingsItem) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      toast.success(inputRef.current.value)
    }
  }
  return (
    <div className="group rounded-lg border border-transparent px-6 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <div className={`mb-3 text-xl font-semibold`}>
        <span className="inline-block -translate-x-1 transition-transform group-hover:-translate-x-3 motion-reduce:transform-none">
          &lt;
        </span>
        <h2 className="inline-flex capitalize"> {name} </h2>
        <span className="inline-block translate-x-1 transition-transform group-hover:translate-x-3 motion-reduce:transform-none">
          &gt;
        </span>
      </div>
      <div className={`m-0 flex items-center gap-2 truncate text-base`}>
        <Input
          ref={inputRef}
          name="email"
          defaultValue={value}
          className="opacity-70 transition-all focus:opacity-100"
        />
        <Button variant={"outline"} onClick={handleClick}>
          Save
        </Button>
      </div>
    </div>
  )
}

export { SettingsItem }
