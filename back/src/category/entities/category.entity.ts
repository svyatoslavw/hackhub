import { returnSubCategoryObject } from "@/subcategory/entities/subcategory.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Category, Prisma } from "@prisma/client"

export class CategoryType implements Category {
  @ApiProperty({ example: "1", description: "Post ID" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Category update date" })
  updatedAt: Date
  @ApiProperty({ example: "Category name", description: "Category name" })
  name: string
  @ApiProperty({ example: "Category icon", description: "Category icon" })
  icon: string
}

export const returnCategoryObject: Prisma.CategorySelect = {
  id: true,
  createdAt: true,
  name: true,
  icon: true,
  subcategories: { select: returnSubCategoryObject }
}
