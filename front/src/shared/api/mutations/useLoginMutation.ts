import { authService } from "@/entities/user/api/auth.service"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TEmailLoginMutation = UseMutationOptions<
  AxiosResponse<IAuthTokenResponse, any>,
  any,
  IAuthEmailLoginForm,
  unknown
>

export const useLoginMutation = (settings?: TEmailLoginMutation) =>
  useMutation({
    mutationKey: ["email login"],
    mutationFn: (data: IAuthEmailLoginForm) => authService.login(data),
    ...settings
  })
