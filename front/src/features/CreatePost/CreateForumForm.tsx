"use client"

import { MarkdownEditor } from "@/pages/CreateForumPage/components/MarkdownEditor"
import { useGetAllCategoriesQuery } from "@/shared/api/queries/useGetAllCategoriesQuery"
import { Button } from "@/shared/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select"
import { useCreateForumForm } from "./useCreateForumForm"

const CreateForumForm = () => {
  const { form, functions, state } = useCreateForumForm()
  const { data: categories } = useGetAllCategoriesQuery()

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={functions.onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="subcategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category:</FormLabel>
                <FormDescription>Choose a category for your topic.</FormDescription>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={state.subcategoryId || field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories &&
                          categories.map((category) => (
                            <div key={category.id}>
                              <SelectLabel className="pl-6 text-primary/90">
                                {category.name}
                              </SelectLabel>
                              {category.subcategories.map((subcategory) => (
                                <SelectItem key={subcategory.id} value={subcategory.id}>
                                  {subcategory.name}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title:</FormLabel>
                <FormDescription>State in a few words what your topic is about.</FormDescription>
                <FormControl>
                  <Input placeholder="Введите название..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MarkdownEditor description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button disabled={state.isLoading} type="submit">
              Create a topic
            </Button>
            <Button variant={"secondary"} disabled type="button">
              Preview
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { CreateForumForm }
