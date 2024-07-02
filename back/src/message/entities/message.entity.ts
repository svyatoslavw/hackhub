import {
  ConversationType,
  returnConversationObject
} from "@/conversation/entities/conversation.entity"
import { UserType, returnUserObject } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Message, Prisma } from "@prisma/client"

export class MessageType implements Message {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category update date" })
  updatedAt: Date
  @ApiProperty({ example: "<p>Hello, world!</p>", description: "Message content" })
  content: string
  @ApiProperty({ type: () => ConversationType })
  conversation: ConversationType
  @ApiProperty({ example: "1", description: "Conversation ID" })
  conversationId: string
  @ApiProperty({ type: () => UserType })
  creator: UserType
  @ApiProperty({ example: "1", description: "Creator ID" })
  creatorId: string
}

export const returnMessageObject: Prisma.MessageSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  conversationId: true,
  conversation: { select: returnConversationObject },
  creatorId: true,
  creator: {
    select: returnUserObject
  }
}
