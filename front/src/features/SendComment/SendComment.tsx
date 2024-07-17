import { useProfile } from "@/entities/user/hooks/useProfile"
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form"
import { Skeleton } from "@/shared/ui/skeleton"
import { MarkdownInput } from "@/widgets/Markdown/MarkdownInput"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSendComment } from "./useSendComment"

const SendComment = () => {
  const pathname = usePathname()

  const { profile } = useProfile()

  const { form, functions, state } = useSendComment(pathname || "")

  return (
    <div className="fixed bottom-0 flex w-[1100px] items-end gap-2 bg-popover p-3">
      {profile ? (
        <Image
          className="rounded-full"
          alt="Profile image"
          src={profile?.image}
          width={40}
          height={40}
        />
      ) : (
        <Skeleton className="h-10 w-10 rounded-full" />
      )}
      <Form {...form}>
        <form onSubmit={functions.onSubmit} className="w-full">
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
    </div>
  )
}

export { SendComment }
