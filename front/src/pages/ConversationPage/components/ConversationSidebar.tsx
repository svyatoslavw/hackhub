"use client"
import { ConversationSearchedItem } from "@/entities/conversation/ui/ConversationSearchedItem"
import { ConversationUserItem } from "@/entities/conversation/ui/ConversationUserItem"
import { useProfile } from "@/entities/user/hooks/useProfile"
import { CreateConversation } from "@/features/CreateConversation/CreateConversation"
import { useGetAllUsersQuery } from "@/shared/api/queries/useGetAllUsersQuery"
import { useGetConversationsByUserIdQuery } from "@/shared/api/queries/useGetConversationsByUserIdQuery"
import { useFilter } from "@/shared/lib/hooks/useFilter"
import { debounce } from "@/shared/lib/utils"
import { Input } from "@/shared/ui/input"
import { ConversationSkeleton } from "./ConversationSkeleton"

const ConversationSidebar = () => {
  const { profile } = useProfile()
  const { data } = useGetConversationsByUserIdQuery()
  const { isFilterUpdated, queryParams, updateQueryParams } = useFilter()

  const { data: users, isLoading } = useGetAllUsersQuery(queryParams, {
    queryKey: ["get all users", queryParams],
    enabled: isFilterUpdated
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => updateQueryParams("username", e.target.value), 700)()
  }

  if (!profile) return
  return (
    <div className="flex w-80 flex-col gap-1 border-r-4 border-background py-2">
      <div className="px-2">
        <Input onChange={(e) => handleSearch(e)} placeholder="Search users..." />
      </div>
      {!queryParams.username ? (
        data?.map((conversation) => (
          <ConversationUserItem
            key={conversation.id}
            conversation={conversation}
            profileId={profile.id}
          />
        ))
      ) : isLoading ? (
        <ConversationSkeleton />
      ) : (
        users?.map((user) => (
          <ConversationSearchedItem key={user.id} user={user}>
            <CreateConversation userId={user.id} />
          </ConversationSearchedItem>
        ))
      )}
    </div>
  )
}

export { ConversationSidebar }
