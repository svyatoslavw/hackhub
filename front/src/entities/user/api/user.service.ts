import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { axiosWithToken } from "@/shared/api"

export const userService = {
  async getAllUsers(queryData = {} as TypeDataFilters) {
    return await axiosWithToken.get<IUser[]>("/users", { params: queryData })
  },

  async getProfile() {
    const response = await axiosWithToken.get<IUser>("/users/profile")
    return response.data
  }
}
