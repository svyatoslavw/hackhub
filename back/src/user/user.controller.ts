import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Controller, Get, Query, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { GetAllUserDto } from "./dto/user.dto"
import { UserType } from "./entities/user.entity"
import { UserService } from "./user.service"

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [UserType] })
  @UsePipes(new ValidationPipe())
  async getAll(@Query() queryDto: GetAllUserDto, @CurrentUser("id") id: string) {
    return this.userService.getAll(queryDto, id)
  }

  @ApiOperation({ summary: "Get user profile with token" })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiResponse({ status: 200, type: UserType })
  @ApiParam({ name: "id", type: String, description: "User ID" })
  @Get("profile")
  @Auth()
  async profile(@CurrentUser("id") id: string) {
    return this.userService.findById(id)
  }
}
