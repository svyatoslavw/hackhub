import { returnCategoryObject } from "@/category/entities/category.entity"
import { returnPostObject } from "@/post/entities/post.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Prisma, SubCategory } from "@prisma/client"

export class SubcategoryType implements SubCategory {
  @ApiProperty({ example: "1", description: "Subcategory ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "Subcategory name", description: "Subcategory name" })
  name: string
  @ApiProperty({ example: "subcategory-slug", description: "Subcategory slug" })
  slug: string
  @ApiProperty({ example: "1", description: "Category ID" })
  categoryId: string
}

export const returnSubCategoryObject: Prisma.SubCategorySelect = {
  id: true,
  createdAt: true,
  name: true,
  slug: true,
  categoryId: true,
  category: { select: returnCategoryObject },
  posts: { select: returnPostObject }
}
