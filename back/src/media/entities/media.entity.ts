import { ApiProperty } from "@nestjs/swagger"

export class MediaResponse {
  @ApiProperty({ example: "uploads/image.png", description: "Url" })
  url: string
  @ApiProperty({ example: "image", description: "Name" })
  name: string
}
