import { returnUserObject } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { News, Prisma } from "@prisma/client"

export class NewsType implements News {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "<p>Content</p>", description: "Content" })
  content: string
  @ApiProperty({ example: "1", description: "User ID" })
  creatorId: string
}

export const returnNewsObject: Prisma.NewsSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  content: true,
  creatorId: true,
  creator: { select: returnUserObject }
}
