import { axiosClassic, axiosWithToken } from "@/shared/api"

export const postService = {
  async getAll() {
    return axiosClassic.get<IPost[]>("/posts")
  },
  async getById(id: string) {
    return axiosClassic.get<IPost>(`/posts/${id}`)
  },
  async create(data: TypeCreatePost) {
    return axiosWithToken.post<IPost>("/posts", data)
  }
}
