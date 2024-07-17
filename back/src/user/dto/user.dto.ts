import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, MinLength } from "class-validator"

export class GetAllUserDto {
  @IsOptional()
  @IsString()
  username?: string
}

export class UpdateUserDto {
  @ApiProperty({ example: "/uploads/image.png", description: "User image" })
  @IsOptional()
  @IsString()
  image?: string

  @ApiProperty({ example: "John", description: "User login" })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Login must be at least 3 characters" })
  login?: string
}
