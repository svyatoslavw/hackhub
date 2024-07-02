import { NewsCard } from "@/entities/news/ui/NewsCard"
import { PollsCard } from "@/entities/poll/ui/PollCard"
import { useVoteInPollMutation } from "@/shared/api/mutations/useVoteInPollMutation"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { toast } from "sonner"

const IS_NEWS = "content"

const ProfileWallList = ({ profile }: { profile: IUser }) => {
  const queryClient = useQueryClient()

  const { mutate } = useVoteInPollMutation({
    onSuccess: () => {
      toast.success("Your vote accepted!", { cancel: { label: "Close" } })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    }
  })

  const hasUserVoted = useCallback(
    (pollId: string) => {
      return profile.votes.some((vote) => vote.option.pollId === pollId)
    },
    [profile.votes]
  )

  const getUserVoteOptionId = useCallback(
    (pollId: string) => {
      const vote = profile.votes.find((vote) => vote.option.pollId === pollId)
      return vote ? vote.optionId : undefined
    },
    [profile.votes]
  )

  const calculatePercentage = (optionVotes: number, totalVotes: number) => {
    return totalVotes === 0 ? 0 : (optionVotes / totalVotes) * 100
  }

  const sortedArray = useMemo(
    () =>
      [...profile.polls, ...profile.news].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [profile.polls, profile.news]
  )

  return (
    <div className="grid grid-cols-1 gap-2">
      {sortedArray.length ? (
        sortedArray.map((item) => {
          if (IS_NEWS in item) {
            return <NewsCard key={item.id} news={item as INews} />
          } else {
            return (
              <PollsCard
                key={item.id}
                poll={item as IPoll}
                mutate={mutate}
                hasUserVoted={hasUserVoted}
                getUserVoteOptionId={getUserVoteOptionId}
                calcPercentage={calculatePercentage}
              />
            )
          }
        })
      ) : (
        <div className="col-span-full w-full border px-3 py-1 text-center">Empty</div>
      )}
    </div>
  )
}

export { ProfileWallList }
