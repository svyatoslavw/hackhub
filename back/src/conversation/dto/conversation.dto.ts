import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateConversationDto {
  @ApiProperty({ example: "1", description: "User id" })
  @IsString()
  id: string

  @ApiProperty({ example: "<p>Hello World!</p>", description: "Conversation first message" })
  @IsString()
  content: string
}
