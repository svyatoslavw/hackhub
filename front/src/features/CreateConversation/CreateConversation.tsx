import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form"
import { MarkdownInput } from "@/widgets/Markdown"
import { useCreateConversationForm } from "./useCreateConversation"

const CreateConversation = ({ userId }: { userId: string }) => {
  const { form, functions, state } = useCreateConversationForm(userId)

  return (
    <Dialog open={state.isOpen} onOpenChange={functions.setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"xs"} variant={"outline"}>
          Написать
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Начать диалог</DialogTitle>
          <DialogDescription>Напишите свое первое сообщение чтобы начать диалог.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={functions.onSubmit}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MarkdownInput
                      isAbsolute={false}
                      isLoading={!form.formState.isValid || state.isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CreateConversation }
