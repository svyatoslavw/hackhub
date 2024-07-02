import { axiosWithToken } from "@/shared/api"

export const messageService = {
  async create(data: TypeSendMessage) {
    return axiosWithToken<IMessage>({
      url: "/messages",
      method: "POST",
      data
    })
  }
}
