import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CommentService } from "./comment.service"
import { CreateCommentDto } from "./dto/comment.dto"
import { CommentType } from "./entities/comment.entity"

@ApiTags("Comments")
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: "Get all comments by post id" })
  @ApiResponse({ status: 200, type: [CommentType] })
  @Get()
  async getAll() {
    return this.commentService.getAll()
  }

  @ApiOperation({ summary: "Create comment" })
  @ApiResponse({ status: 200, type: CommentType })
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser("id") id: string) {
    return this.commentService.create(id, createCommentDto)
  }
}
