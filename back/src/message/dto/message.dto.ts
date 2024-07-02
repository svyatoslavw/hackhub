import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMessageDto {
  @ApiProperty({ example: "<p>Hello World!</p>", description: "Message content" })
  @IsString()
  content: string

  @ApiProperty({ example: "1", description: "Conversation ID" })
  @IsString()
  conversationId: string
}
