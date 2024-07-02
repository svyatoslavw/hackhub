import { IsOptional, IsString } from "class-validator"

export class GetAllUserDto {
  @IsOptional()
  @IsString()
  username?: string
}
