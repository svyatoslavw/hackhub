import { Injectable } from "@nestjs/common"
import { path } from "app-root-path"
import { ensureDir, writeFile } from "fs-extra"
import { v4 as uuidv4 } from "uuid"
import { MediaResponse } from "./entities/media.entity"

@Injectable()
export class MediaService {
  async saveMediaFile(mediaFile: Express.Multer.File): Promise<MediaResponse> {
    const uploadFolder = `${path}/uploads/`

    const uniqueFilename = `${uuidv4()}_${mediaFile.originalname}`

    await ensureDir(uploadFolder)

    await writeFile(`${uploadFolder}/${uniqueFilename}`, mediaFile.buffer)

    return {
      url: `/uploads/${uniqueFilename}`,
      name: mediaFile.originalname
    }
  }
  async saveMediaFiles(mediaFiles: Express.Multer.File[]): Promise<MediaResponse[]> {
    const uploadFolder = `${path}/uploads/`

    await ensureDir(uploadFolder)

    const res: MediaResponse[] = []

    for (const mediaFile of mediaFiles) {
      const uniqueFilename = `${uuidv4()}_${mediaFile.originalname}`
      await writeFile(`${uploadFolder}/${uniqueFilename}`, mediaFile.buffer)

      res.push({
        url: `/uploads/${uniqueFilename}`,
        name: mediaFile.originalname
      })
    }

    return res
  }
}
