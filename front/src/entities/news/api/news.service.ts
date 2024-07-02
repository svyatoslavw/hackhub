import { axiosWithToken } from "@/shared/api"

export const newsService = {
  async create(data: TypeAddNews) {
    return axiosWithToken<INews>({
      url: "/news",
      method: "POST",
      data
    })
  }
}
