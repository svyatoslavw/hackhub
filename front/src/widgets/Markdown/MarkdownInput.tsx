import { EditorContent } from "@tiptap/react"

import { usePoll } from "@/pages/ProfilePage/contexts/usePoll/usePoll"
import { useMarkdown } from "@/shared/lib/hooks/useMarkdown"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Skeleton } from "@/shared/ui/skeleton"
import { ArrowDown, ArrowUp, SendHorizontal } from "lucide-react"
import { useState } from "react"
import { MarkdownHeader } from "./MarkdownHeader"

const MarkdownInput = ({
  isLoading,
  isNews = false,
  isAbsolute = true,
  onChange,
  onTyping
}: {
  isLoading: boolean
  isNews?: boolean
  isAbsolute?: boolean
  onChange: (value: string) => void
  onTyping?: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isPoll, setIsPoll } = usePoll()
  const { editor, onReset } = useMarkdown(onChange, onTyping)

  if (!editor) return <Skeleton className="h-10 w-full px-3 py-2" />

  return (
    <>
      <div
        className={cn("flex w-full items-end gap-2", {
          "absolute bottom-0 right-0": isAbsolute
        })}
      >
        <div className="w-full">
          <MarkdownHeader
            editor={editor}
            className={cn(
              "rounded-t-lg border border-b-0 border-input bg-background p-1 transition",
              {
                "h-0 animate-down overflow-hidden opacity-0": !isOpen,
                "h-auto animate-up overflow-auto opacity-100": isOpen
              }
            )}
          />
          <EditorContent editor={editor} />
        </div>
        <div className="my-1 flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size={"icon"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {!isOpen ? <ArrowUp /> : <ArrowDown />}
          </Button>
          {!isNews && (
            <Button
              onClick={onReset}
              disabled={isLoading}
              type="submit"
              variant="default"
              size={"icon"}
            >
              <SendHorizontal />
            </Button>
          )}
        </div>
      </div>
      {isNews && (
        <div className="flex gap-3">
          <Button onClick={onReset} disabled={isLoading} type="submit" size={"sm"}>
            Publish
          </Button>
          <Button
            type="button"
            onClick={() => setIsPoll((prev) => !prev)}
            variant={"secondary"}
            size={"sm"}
          >
            {isPoll ? "Cancel vote" : "Add voting"}
          </Button>
        </div>
      )}
    </>
  )
}

export { MarkdownInput }
