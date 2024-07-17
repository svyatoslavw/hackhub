import { axiosClassic } from "@/shared/api/api.interceptor"

import { removeCookiesFromStorage, saveTokenStorage } from "./auth-token.service"

export const authService = {
  async login(data: IAuthEmailLoginForm) {
    const response = await axiosClassic.post<IAuthTokenResponse>("/auth/login", data)

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

    return response
  },

  async emailConfirmation(data: IAuthEmailConfirmationForm) {
    const response = await axiosClassic.post<TAuthResponse>("/auth/confirmation-email", data)

    if ("accessToken" in response.data) {
      saveTokenStorage(response.data.accessToken)
    }

    return response
  },

  async phoneConfirmation(data: IAuthPhoneConfirmationForm) {
    return axiosClassic.post<IAuthCodeResponse>("/auth/confirmation-phone", data)
  },

  async profileConfirmation(data: IProfileConfirmation) {
    return axiosClassic.post<IAuthCodeResponse>("/auth/confirmation-profile", data)
  },

  async register(data: IAuthRegisterForm) {
    const response = await axiosClassic.post<IAuthTokenResponse>("/auth/register", data)

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

    return response
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthTokenResponse>("/auth/login/access-token")

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

    return response
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/auth/logout")

    if (response.data) {
      removeCookiesFromStorage()
    }

    return response
  }
}
