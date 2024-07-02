import { useProfile } from "@/entities/user/hooks/useProfile"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form"
import { MarkdownInput } from "@/widgets/Markdown/MarkdownInput"
import Image from "next/image"
import { useAddNews } from "./useAddNews"

const AddNews = () => {
  const { form, functions, state } = useAddNews()
  const { profile } = useProfile()
  if (!profile) return

  return (
    <div className="flex max-w-full items-start gap-3">
      <Image
        className="my-2 rounded-full"
        alt="Profile image"
        src={profile.image}
        width={40}
        height={40}
      />
      <Form {...form}>
        <form onSubmit={functions.onSubmit} className="flex w-full flex-col gap-4">
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-full">
                  <MarkdownInput
                    isNews
                    isAbsolute={false}
                    isLoading={!form.formState.isValid || state.isPending}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export { AddNews }
