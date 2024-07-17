import { useLogoutMutation } from "@/shared/api/mutations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next13-progressbar"

const HeaderProfileDropdown = ({ profile }: { profile: IUser }) => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()

  const { mutate } = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear()
      replace("/")
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex h-full cursor-pointer items-center gap-2 px-2 text-xs font-medium transition-all hover:bg-secondary/70">
          <span> {profile.login}</span>
          <Image
            className="rounded-full"
            alt="Profile image"
            src={profile.image}
            width={36}
            height={36}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-sans">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href={"/profile"}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="w-full" href={"/settings"}>
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href={"/conversations"}>
              Friends (Beta)
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={mutate}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { HeaderProfileDropdown }
