import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class CreateSubCategoryDto {
  @ApiProperty({ example: "Programming", description: "Name of subcategory" })
  @IsString()
  @MinLength(1, { message: "Name must have than 5 characters" })
  name: string

  @ApiProperty({ example: "1", description: "Category id" })
  @IsString()
  categoryId: string
}
