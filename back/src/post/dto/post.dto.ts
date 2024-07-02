import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreatePostDto {
  @ApiProperty({ example: "My first post", description: "Post title" })
  @IsString({ message: "Title must have than 5 characters" })
  title: string

  @ApiProperty({ example: "<p>Hello World!</p>", description: "Post content" })
  @IsString({ message: "Content is required" })
  content: string

  @ApiProperty({ example: "1", description: "Subcategory id" })
  @IsString({ message: "subcategoryId is required" })
  subcategoryId: string
}
