import { axiosClassic, axiosWithToken } from "@/shared/api"

export const categoryService = {
  async getAll() {
    return axiosClassic.get<ICategory[]>("/categories")
  },
  async getAllSubcategories() {
    return axiosClassic.get<ISubcategory[]>("/subcategories")
  },
  async create(data: TypeCreateCategory) {
    return axiosWithToken<ICategory>({
      url: "/categories",
      method: "POST",
      data
    })
  },
  async createSubcategory(data: TypeCreateSubcategory) {
    return axiosWithToken<ISubcategory>({
      url: "/subcategories",
      method: "POST",
      data
    })
  }
}
