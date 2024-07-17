"use client"

import { useGetAllCategoriesQuery } from "@/shared/api/queries/useGetAllCategoriesQuery"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
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
import { Controller } from "react-hook-form"
import { useCreateSubcategoryForm } from "./useCreateSubcategoryForm"

const CreateSubcategory = () => {
  const { form, functions, state } = useCreateSubcategoryForm()
  const { data: categories } = useGetAllCategoriesQuery()
  return (
    <Dialog open={state.isOpen} onOpenChange={functions.setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"w-full"} size={"sm"}>
          Create Subcategory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a section</DialogTitle>
        </DialogHeader>
        <form onSubmit={functions.onSubmit} className="grid gap-2">
          <Input
            {...form.register("name", { required: "email is required" })}
            placeholder="Name"
            error={form.formState.errors.name?.message}
          />
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories &&
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Button disabled={state.isLoading || !form.formState.isValid} type="submit">
            Create subcategory
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateSubcategory }
