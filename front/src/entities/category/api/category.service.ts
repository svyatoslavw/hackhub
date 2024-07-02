import { axiosClassic, axiosWithToken } from "@/shared/api"

export const categoryService = {
  async getAll() {
    return axiosClassic.get<ICategory[]>("/category")
  },
  async create(data: TypeCreateCategory) {
    return axiosWithToken<ICategory>({
      url: "/category",
      method: "POST",
      data
    })
  },
  async createSubcategory(data: TypeCreateSubcategory) {
    return axiosWithToken<ISubcategory>({
      url: "/subcategory",
      method: "POST",
      data
    })
  }
}
