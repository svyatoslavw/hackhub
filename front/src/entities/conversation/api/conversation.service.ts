import { axiosClassic, axiosWithToken } from "@/shared/api"

export const conversationService = {
  async getAllByUserId() {
    return axiosWithToken<IConversation[]>({
      url: "/conversations",
      method: "GET"
    })
  },
  async getByIdOnServer(id: string, token: string) {
    return axiosClassic<IConversation>({
      url: `/conversations/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  async getById(id: string) {
    return axiosWithToken<IConversation>({
      url: `/conversations/${id}`,
      method: "GET"
    })
  },
  async create(data: TypeCreateConversation) {
    return axiosWithToken<IConversation>({
      url: "/conversations",
      method: "POST",
      data
    })
  }
}
