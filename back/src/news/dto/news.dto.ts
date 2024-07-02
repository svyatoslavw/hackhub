import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateNewsDto {
  @ApiProperty({ example: "<p>Content</p>", description: "Content of the news" })
  @IsString({ message: "Content must be a string" })
  content: string
}

export class UpdateNewsDto {
  @ApiProperty({ example: "<p>Updated Content</p>", description: "Content of the news" })
  @IsString({ message: "Content must be a string" })
  content: string
}
