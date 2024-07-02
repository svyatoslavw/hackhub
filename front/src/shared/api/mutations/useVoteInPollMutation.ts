import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { pollService } from "@/entities/poll/api/poll.service"

export type TVoteInPollMutation = UseMutationOptions<
  AxiosResponse<IVote, any>,
  unknown,
  TypeVoteInPoll,
  unknown
>

export const useVoteInPollMutation = (settings?: TVoteInPollMutation) =>
  useMutation<AxiosResponse<IVote, any>, unknown, TypeVoteInPoll, unknown>({
    mutationKey: ["vote in poll"],
    mutationFn: (data: TypeVoteInPoll) => pollService.voteInPoll(data),
    ...settings
  })
