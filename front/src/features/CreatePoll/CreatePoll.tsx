"use client"

import { usePoll } from "@/pages/ProfilePage/contexts/usePoll/usePoll"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { X } from "lucide-react"
import { useFieldArray } from "react-hook-form"
import { useCreatePoll } from "./useCreatePoll"

const CreatePoll = () => {
  const { isPoll } = usePoll()
  const { form, functions } = useCreatePoll()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options"
  })

  return (
    <Form {...form}>
      <form
        onSubmit={functions.onSubmit}
        className={cn("flex flex-col gap-8 transition-all duration-200", {
          "h-0 animate-up overflow-hidden opacity-0": !isPoll,
          "h-auto animate-down overflow-auto opacity-100 ": isPoll
        })}
      >
        <FormField
          name="question"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Question:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Question..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              name={`options.${index}.text`}
              render={({ field }) => (
                <FormItem className="flex w-full items-center gap-2 space-y-0">
                  <FormControl>
                    <Input {...field} placeholder={`Answer option ${index + 1}...`} />
                  </FormControl>
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"secondary"}
                    onClick={() => remove(index)}
                  >
                    <X color="gray" />
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            disabled={fields.length >= 8}
            onClick={() => fields.length < 8 && append({ text: "" })}
          >
            Add an answer option
          </Button>
          <Button size={"sm"} type="submit">
            Create poll
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreatePoll }
