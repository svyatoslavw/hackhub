import { useUpdateProfileForm } from "@/features/UpdateProfileImage/useUpdateProfile"
import { useLogoutMutation } from "@/shared/api/mutations"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useQueryClient } from "@tanstack/react-query"
import { UserRoundMinusIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next13-progressbar"

const AccountSettings = ({ profile }: { profile: IUser }) => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const { form, functions, state } = useUpdateProfileForm({ profile })
  const { mutate } = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear()
      replace("/")
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Account</h1>
        <span className="text-sm ">Change your account preferences.</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className=" font-semibold">Login</h1>
          <span className="text-xs">You can change your login to any other available one.</span>
        </div>
        <form onSubmit={functions.onSubmit} className="flex flex-col gap-1">
          <Input {...form.register("login")} />
          <Button
            disabled={!form.formState.isDirty || state.isLoading}
            type="submit"
            variant={"outline"}
          >
            Save
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-semibold">Exit account</h1>
          <span className="max-w-md text-xs">
            Signing out of your account will end your current session. You will need to sign in
            again or switch accounts.
          </span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <Image
            src={profile.image}
            alt={profile.login}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="text-sm">
            <h3>{profile.login}</h3>
            <span>{profile.email}</span>
          </div>
        </div>
        <Button onClick={mutate} className="max-w-40 text-xs" size={"sm"}>
          <UserRoundMinusIcon size={18} className="mr-1" />
          Sign out
        </Button>
      </div>
    </div>
  )
}

export { AccountSettings }
