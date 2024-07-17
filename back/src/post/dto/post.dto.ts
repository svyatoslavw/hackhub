import { PaginationDto } from "@/pagination/dto/pagination.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class CreatePostDto {
  @ApiProperty({ example: "My first post", description: "Post title" })
  @IsString({ message: "Title must have than 5 characters" })
  title: string

  @ApiProperty({ example: "<p>Hello World!</p>", description: "Post content" })
  @IsString({ message: "Content is required" })
  content: string

  @ApiProperty({ example: "1", description: "Subcategory id" })
  @IsString({ message: "subcategoryId is required" })
  subcategoryId: string
}

export enum EnumPostCreatedSort {
  NEWEST = "newest",
  OLDEST = "oldest"
}

export enum EnumPostDateSort {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year"
}

export class GetAllPostDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumPostCreatedSort)
  sort?: EnumPostCreatedSort

  @IsOptional()
  @IsEnum(EnumPostDateSort)
  range?: EnumPostDateSort

  @IsOptional()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @IsString()
  subcategory?: string
}
