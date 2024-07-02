import { returnCommentObject } from "@/comment/entities/comment.entity"
import { returnSubCategoryObject } from "@/subcategory/entities/subcategory.entity"
import { returnUserObject } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { $Enums, Post, Prisma } from "@prisma/client"

export class PostType implements Post {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "My first post", description: "Post title" })
  title: string
  @ApiProperty({ example: "This is my first post", description: "Post content" })
  content: string
  @ApiProperty({
    example: $Enums.PostStatus.PUBLISHED,
    description: "Post status",
    enum: $Enums.PostStatus
  })
  status: $Enums.PostStatus
  @ApiProperty({ example: "1", description: "Post category ID" })
  subcategoryId: string
  @ApiProperty({ example: "1", description: "Post creator ID" })
  creatorId: string
}

export const returnPostObject: Prisma.PostSelect = {
  id: true,
  createdAt: true,
  title: true,
  content: true,
  status: true,
  creatorId: true,
  subcategoryId: true,
  comments: { select: returnCommentObject, orderBy: { createdAt: "asc" } },
  creator: { select: returnUserObject },
  subcategory: { select: returnSubCategoryObject }
}
