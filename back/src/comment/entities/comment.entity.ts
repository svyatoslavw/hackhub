import { returnPostObject } from "@/post/entities/post.entity"
import { returnUserObject } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Comment, Prisma } from "@prisma/client"

export class CommentType implements Comment {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "<p>Hello World!</p>", description: "Post content" })
  content: string
  @ApiProperty({ example: "1", description: "Post creator ID" })
  creatorId: string
  @ApiProperty({ example: "1", description: "Post ID" })
  postId: string
}

export const returnCommentObject: Prisma.CommentSelect = {
  id: true,
  createdAt: true,
  content: true,
  postId: true,
  post: { select: returnPostObject },
  creatorId: true,
  creator: { select: returnUserObject }
}
