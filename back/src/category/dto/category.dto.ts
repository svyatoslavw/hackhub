import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateCategoryDto {
  @IsString()
  @MinLength(1, { message: "Name must have than 5 characters" })
  @MaxLength(20, { message: "Name must have less than 20 characters" })
  name: string

  @IsString()
  icon: string
}
