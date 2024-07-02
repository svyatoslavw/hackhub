import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { pollService } from "@/entities/poll/api/poll.service"

type TCreatePollMutation = UseMutationOptions<
  AxiosResponse<IPoll, any>,
  unknown,
  TypeCreatePoll,
  unknown
>

export const useCreatePollMutation = (settings?: TCreatePollMutation) =>
  useMutation<AxiosResponse<IPoll, any>, unknown, TypeCreatePoll, unknown>({
    mutationKey: ["create poll"],
    mutationFn: (data: TypeCreatePoll) => pollService.create(data),
    ...settings
  })
