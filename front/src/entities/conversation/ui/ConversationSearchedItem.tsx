import { Button } from "@/shared/ui/button"
import Image from "next/image"

interface ConversationSearchedItemProps {
  user: IUser
  children?: React.ReactNode
}

const ConversationSearchedItem = ({ user, children }: ConversationSearchedItemProps) => {
  return (
    <div
      id={user.id}
      className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-secondary"
    >
      <div className="flex items-start">
        <Image alt="image" className="rounded-full" src={user.image} width={48} height={48} />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-medium">{user.login}</h4>
        <div className="flex gap-1">
          <Button size={"xs"} variant={"default"}>
            Subscribe
          </Button>
          {children}
        </div>
      </div>
    </div>
  )
}

export { ConversationSearchedItem }
