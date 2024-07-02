import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMaxSize, ArrayMinSize, IsString, ValidateNested } from "class-validator"

class OptionDto {
  @ApiProperty({ example: "Option 1", description: "Text of option" })
  @IsString({ message: "Option is required" })
  text: string
}

export class CreatePollDto {
  @ApiProperty({ example: "Question", description: "Question of poll" })
  @IsString({ message: "Question is required" })
  question: string

  @ApiProperty({ example: ["Option 1", "Option 2"], description: "Options of poll" })
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayMinSize(1, { message: "Minimum 1 option" })
  @ArrayMaxSize(8, { message: "Maximum 8 options" })
  options: OptionDto[]
}

export class VoteInPollDto {
  @ApiProperty({ example: "Option ID", description: "ID of option" })
  optionId: string
}
