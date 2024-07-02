import { authService } from "@/entities/user/api/auth.service"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type TPhoneConfirmationMutation = UseMutationOptions<
  AxiosResponse<IAuthCodeResponse, any>,
  any,
  IAuthPhoneConfirmationForm,
  unknown
>

export const usePhoneConfirmationMutation = (settings?: TPhoneConfirmationMutation) =>
  useMutation({
    mutationKey: ["phone confirmation"],
    mutationFn: (data: IAuthPhoneConfirmationForm) => authService.phoneConfirmation(data),
    ...settings
  })
