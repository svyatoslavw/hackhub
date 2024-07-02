import { IMediaResponse, mediaService } from "@/shared/api/services/media.service"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent } from "react"

export const useUploadFile = (
  onChange: (value: string | string[]) => void,
  isMultiply: boolean = false
) => {
  const { mutate } = useMutation({
    mutationKey: ["upload file"],
    mutationFn: async (data: FormData) => {
      return isMultiply ? mediaService.uploadFiles(data) : mediaService.uploadFile(data)
    },
    onSuccess: (response: { data: IMediaResponse | IMediaResponse[] }) => {
      if (isMultiply) {
        const urls = (response.data as IMediaResponse[]).map((item) => item.url)
        onChange(urls)
      } else {
        onChange((response.data as IMediaResponse).url)
      }
    },
    onError(error: any) {
      alert(error.message)
    }
  })

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("media", file)
    })

    mutate(formData)
  }

  return { uploadFile }
}
