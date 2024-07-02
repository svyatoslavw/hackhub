import { Auth } from "@/auth/decorators/auth.decorator"
import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger"
import { MediaResponse } from "./entities/media.entity"
import { MediaService } from "./media.service"

@ApiTags("Media")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiResponse({ status: 200, type: MediaResponse })
  @ApiOperation({ summary: "Upload single file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" }
      }
    }
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @Auth()
  @Post("file")
  @UseInterceptors(FileInterceptor("media"))
  async uploadMediaFile(@UploadedFile() mediaFile: Express.Multer.File) {
    return this.mediaService.saveMediaFile(mediaFile)
  }

  @ApiResponse({ status: 200, type: [MediaResponse] })
  @ApiOperation({ summary: "Upload multiple files" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" }
      }
    }
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @Auth()
  @Post("files")
  @UseInterceptors(FilesInterceptor("media"))
  async uploadMediaFiles(@UploadedFiles() mediaFile: Express.Multer.File[]) {
    return this.mediaService.saveMediaFiles(mediaFile)
  }
}
