import { axiosWithToken } from "../api.interceptor"

export interface IMediaResponse {
  name: string
  url: string
}

export const mediaService = {
  async uploadFile(media: FormData) {
    return axiosWithToken.post<IMediaResponse>("/media/file", media, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  },
  async uploadFiles(media: FormData) {
    return axiosWithToken.post<IMediaResponse[]>("/media/files", media, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  }
}
