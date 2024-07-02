import {
  Bold,
  Code,
  Heading2,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Redo2,
  SeparatorHorizontal,
  Strikethrough,
  TextQuote,
  Undo2
} from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Toggle } from "@/shared/ui/toggle"
import { UploadInput } from "@/shared/ui/upload-input"
import { type Editor } from "@tiptap/react"
import { useState } from "react"

const MarkdownHeader = ({ editor, className }: { editor: Editor; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("flex gap-1 rounded-t-lg border border-input bg-background p-1", className)}>
      <Button
        size={"icon"}
        variant={"ghost"}
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </Button>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading")}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("hardBreak")}
        onPressedChange={() => editor.chain().focus().setHardBreak().run()}
      >
        <SeparatorHorizontal className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Toggle size={"sm"} pressed={editor.isActive("image")}>
            <ImageIcon className="h-4 w-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Изображение</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid items-start gap-4">
              <Input placeholder="URL-адрес изображения..." className="col-span-full" />
              <Button type="submit" className="col-span-full">
                Вставить
              </Button>
            </div>
            <div className="text-center">или</div>
            <UploadInput
              isMultiply
              multiple
              onUpload={(value) => {
                editor
                  .chain()
                  .focus()
                  .setImage({ src: value as string })
                  .run()
                setIsOpen(false)
              }}
              value={undefined}
            />
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { MarkdownHeader }
