"use client"

import { Skeleton } from "@/shared/ui/skeleton"
import { MarkdownHeader } from "@/widgets/Markdown/MarkdownHeader"
import Blockquote from "@tiptap/extension-blockquote"
import BulletList from "@tiptap/extension-bullet-list"
import CodeBlock from "@tiptap/extension-code-block"
import Dropcursor from "@tiptap/extension-dropcursor"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from "@tiptap/extension-heading"
import Images from "@tiptap/extension-image"
import OrderedList from "@tiptap/extension-ordered-list"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const MarkdownEditor = ({
  description,
  onChange
}: {
  description: string
  onChange: (value: string) => void
}) => {
  const editor = useEditor({
    extensions: [
      Dropcursor.configure({ color: "primary", class: "bg-primary" }),
      StarterKit.configure({}),
      Heading.configure({ HTMLAttributes: { class: "text-lg font-bold", levels: [2] } }),
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: false,
        HTMLAttributes: { class: "list-disc ml-5" }
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: false,
        HTMLAttributes: { class: "list-decimal ml-5" }
      }),
      Images.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: "focus:border-primary focus:border" }
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-",
        HTMLAttributes: {
          class: "rounded-md border border-input bg-accent p-2 text-sm"
        }
      }),
      HardBreak.configure({
        keepMarks: false
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-l-primary ml-2 pl-4"
        }
      })
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "rounded-md border border-input bg-background text-sm focus-visible:outline-none selection:bg-primary/40 bg-background p-3 min-h-[250px]"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  if (!editor) return <Skeleton className="min-h-[300px] rounded-md" />

  return (
    <div className="flex min-h-[300px] flex-col justify-stretch gap-1">
      <MarkdownHeader editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export { MarkdownEditor }
