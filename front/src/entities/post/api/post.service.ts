import { axiosClassic, axiosWithToken } from "@/shared/api"

export const postService = {
  async getAll(params = {}) {
    const response = await axiosClassic<IPostResponse>({
      method: "GET",
      url: "/posts",
      params
    })

    return response.data
  },
  async getSome(params = {}) {
    const response = await axiosClassic<IPostResponse>({
      method: "GET",
      url: "/posts/some",
      params
    })

    return response.data
  },
  async getById(id: string) {
    return axiosClassic.get<IPost>(`/posts/${id}`)
  },
  async create(data: TypeCreatePost) {
    return axiosWithToken.post<IPost>("/posts", data)
  }
}
