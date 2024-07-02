import { Label } from "@/shared/ui/label"
import { RadioGroupItem } from "@/shared/ui/radio-group"
import { animated, useSpring } from "@react-spring/web"
import { useEffect } from "react"

interface OptionItemProps {
  option: IOption
  poll: IPoll
  hasUserVoted: (pollId: string) => boolean
  calcPercentage: (optionVotes: number, totalVotes: number) => number
}

const OptionItem = ({ option, poll, hasUserVoted, calcPercentage }: OptionItemProps) => {
  const optionVotes = calcPercentage(
    option.votes.length,
    poll.options.reduce((acc, option) => acc + option.votes.length, 0)
  )
  const [props, api] = useSpring(() => ({ width: 0 }))

  useEffect(() => {
    api.start({ width: optionVotes })
  }, [optionVotes, api])

  return (
    <div className="flex flex-col gap-2">
      <div key={option.id} className="flex items-center space-x-2">
        <RadioGroupItem className="size-5 border-2" value={option.id} id={option.id} />
        <Label htmlFor={option.id} className="flex w-[370px] justify-between">
          <span>{option.text}</span>
          {hasUserVoted(poll.id) && (
            <animated.div className="text-xs">
              {props.width.to((v) => `${v.toFixed(0)}%`)}
            </animated.div>
          )}
        </Label>
      </div>
      {hasUserVoted(poll.id) && (
        <div className="h-1 w-[400px] rounded-full bg-zinc-600">
          <animated.div
            className="h-full rounded-full bg-primary"
            style={{
              width: props.width.to((w) => `${w}%`)
            }}
          />
        </div>
      )}
    </div>
  )
}

export { OptionItem }
