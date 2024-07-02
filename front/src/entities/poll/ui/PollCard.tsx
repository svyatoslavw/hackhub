import { type TVoteInPollMutation } from "@/shared/api/mutations"
import { formatPostDate } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { RadioGroup } from "@/shared/ui/radio-group"
import { memo, useState } from "react"
import { OptionItem } from "./OptionItem"

interface PollsCardProps {
  poll: IPoll
  mutate: (variables: TypeVoteInPoll, options?: TVoteInPollMutation) => void
  hasUserVoted: (pollId: string) => boolean
  getUserVoteOptionId: (pollId: string) => string | undefined
  calcPercentage: (optionVotes: number, totalVotes: number) => number
}

const PollsCard = memo(
  ({ poll, hasUserVoted, mutate, getUserVoteOptionId, calcPercentage }: PollsCardProps) => {
    const [value, setValue] = useState("")

    return (
      <div className="flex flex-col gap-4 rounded p-3 transition hover:bg-secondary/50">
        <h3 className="text-lg font-medium">{poll.question}</h3>
        <div className="space-y-4">
          <RadioGroup
            className="flex flex-col space-y-2"
            onValueChange={(value) => setValue(value)}
            value={hasUserVoted(poll.id) ? getUserVoteOptionId(poll.id) : undefined}
          >
            {poll.options.map((option) => (
              <OptionItem key={option.id} {...{ option, poll, calcPercentage, hasUserVoted }} />
            ))}
          </RadioGroup>
          <div className="flex items-end justify-between text-xs text-zinc-400">
            <Button
              disabled={hasUserVoted(poll.id)}
              onClick={() => mutate({ optionId: value })}
              size={"sm"}
              variant={hasUserVoted(poll.id) ? "outline" : "default"}
            >
              {hasUserVoted(poll.id) ? "You have already voted" : "Vote"}
            </Button>
            <span>Created at: {formatPostDate(poll.createdAt)}</span>
          </div>
        </div>
      </div>
    )
  }
)

PollsCard.displayName = "PollsCard"

export { PollsCard }
