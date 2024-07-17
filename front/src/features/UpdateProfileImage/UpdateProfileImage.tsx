import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { UploadInput } from "@/shared/ui/upload-input"
import { Controller } from "react-hook-form"
import { useUpdateProfileForm } from "./useUpdateProfile"

const UpdateProfileImage = ({ profile }: { profile: IUser }) => {
  const { form, functions, state } = useUpdateProfileForm({ profile })
  return (
    <Dialog open={state.isOpen} onOpenChange={functions.setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={functions.onSubmit} className="flex flex-col gap-4 py-4">
          <Controller
            control={form.control}
            name="image"
            render={({ field: { onChange } }) => (
              <UploadInput
                onUpload={(value) => {
                  onChange(value)
                }}
                value={undefined}
              />
            )}
          />
          <Button disabled={state.isLoading} type="submit">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { UpdateProfileImage }
