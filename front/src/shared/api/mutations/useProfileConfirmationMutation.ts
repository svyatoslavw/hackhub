import { authService } from "@/entities/user/api/auth.service"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TEmailConfirmationMutation = UseMutationOptions<
  AxiosResponse<IAuthCodeResponse, any>,
  unknown,
  IProfileConfirmation,
  unknown
>

export const useProfileConfirmationMutation = (settings?: TEmailConfirmationMutation) =>
  useMutation({
    mutationKey: ["email confirmation"],
    mutationFn: (data: IProfileConfirmation) => authService.profileConfirmation(data),
    ...settings
  })
