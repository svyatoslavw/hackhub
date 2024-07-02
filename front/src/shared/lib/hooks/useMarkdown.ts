import Blockquote from "@tiptap/extension-blockquote"
import BulletList from "@tiptap/extension-bullet-list"
import CodeBlock from "@tiptap/extension-code-block"
import Dropcursor from "@tiptap/extension-dropcursor"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from "@tiptap/extension-heading"
import Images from "@tiptap/extension-image"
import OrderedList from "@tiptap/extension-ordered-list"
import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export const useMarkdown = (onChange?: (value: string) => void, onTyping?: () => void) => {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Write something..."
      }),
      Dropcursor.configure({ color: "primary", class: "bg-primary" }),
      StarterKit.configure({}),
      Heading.configure({ HTMLAttributes: { class: "text-xl font-bold", levels: [2] } }),
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
          class: "rounded-md border border-input bg-accent p-1 text-sm"
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
    content: "",
    editorProps: {
      attributes: {
        class: `min-h-10 max-h-60 text-sm max-w-full min-w-full overflow-auto border border-input bg-background px-3 py-2 focus-visible:outline-none selection:bg-primary/40 rounded-lg`
      }
    },
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML())
      onTyping && onTyping()
    }
  })

  const onReset = () => {
    editor?.commands.clearContent()
  }

  return { editor, onReset }
}
