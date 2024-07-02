import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCommentDto {
  @ApiProperty({
    example: "This is a comment",
    description: "The content of the comment"
  })
  @IsString({ message: "Content is required" })
  content: string

  @ApiProperty({
    example: "12345",
    description: "The ID of the post"
  })
  @IsString({ message: "PostId is required" })
  postId: string
}
