import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { userService } from "@/entities/user/api/user.service"

type TUpdateProfileMutation = UseMutationOptions<
  AxiosResponse<IUser, any>,
  unknown,
  TypeUpdateProfile,
  unknown
>

export const useUpdateProfileMutation = (settings?: TUpdateProfileMutation) =>
  useMutation<AxiosResponse<IUser, any>, unknown, TypeUpdateProfile, unknown>({
    mutationKey: ["update profile"],
    mutationFn: (data: TypeUpdateProfile) => userService.update(data),
    ...settings
  })
