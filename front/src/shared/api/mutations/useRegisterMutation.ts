import { authService } from "@/entities/user/api/auth.service"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TRegisterMutation = UseMutationOptions<
  AxiosResponse<IAuthTokenResponse, any>,
  any,
  IAuthRegisterForm,
  unknown
>

export const useRegisterMutation = (settings?: TRegisterMutation) =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthRegisterForm) => authService.register(data),
    ...settings
  })
