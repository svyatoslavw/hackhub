import { MessageType, returnMessageObject } from "@/message/entities/message.entity"
import { UserType } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Conversation, Prisma } from "@prisma/client"

export class ConversationType implements Conversation {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category update date" })
  updatedAt: Date
  @ApiProperty({ type: () => [MessageType] })
  messages: MessageType[]
  @ApiProperty({ type: () => UserType })
  creator: UserType
  @ApiProperty({ example: "1", description: "Creator ID" })
  creatorId: string
  @ApiProperty({ type: () => UserType })
  recipient: UserType
  @ApiProperty({ example: "1", description: "Recipient ID" })
  recipientId: string
}

export const returnConversationObject: Prisma.ConversationSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  messages: { select: returnMessageObject },
  creatorId: true,
  recipientId: true,
  creator: {
    select: {
      id: true,
      login: true,
      image: true
    }
  },
  recipient: {
    select: {
      id: true,
      login: true,
      image: true
    }
  }
}
