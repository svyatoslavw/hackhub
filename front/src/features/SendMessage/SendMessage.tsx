import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form"
import { MarkdownInput } from "@/widgets/Markdown/MarkdownInput"
import { useSendMessage } from "./useSendMessage"

const SendMessage = ({ onTyping }: { onTyping: () => void }) => {
  const { form, functions, state } = useSendMessage()

  return (
    <Form {...form}>
      <form onSubmit={functions.onSubmit}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <MarkdownInput
                  isLoading={!form.formState.isValid || state.isPending}
                  onChange={field.onChange}
                  onTyping={onTyping}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { SendMessage }
