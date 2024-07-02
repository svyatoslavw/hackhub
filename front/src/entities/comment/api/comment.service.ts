import { axiosClassic, axiosWithToken } from "@/shared/api"

export const commentService = {
  async getAll() {
    return axiosClassic.get<IPost[]>("/posts")
  },
  async create(data: TypeSendComment) {
    return axiosWithToken.post<IComment>("/comments", data)
  }
}
