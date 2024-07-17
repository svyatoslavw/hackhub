import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { UploadInput } from "@/shared/ui/upload-input"
import { Controller } from "react-hook-form"
import { useCreateCategoryForm } from "./useCreateCategoryForm"

const CreateCategory = () => {
  const { form, state, functions } = useCreateCategoryForm()

  return (
    <Dialog open={state.isOpen} onOpenChange={functions.setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"w-full"} size={"sm"}>
          Create category
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
            name="icon"
            render={({ field: { onChange } }) => (
              <UploadInput
                onUpload={(value) => {
                  onChange(value)
                }}
                value={undefined}
              />
            )}
          />
          <Button disabled={state.isLoading || !form.formState.isValid} type="submit">
            Create category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateCategory }
