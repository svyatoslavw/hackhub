import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreatePostDto, GetAllPostDto } from "./dto/post.dto"
import { PostType } from "./entities/post.entity"
import { PostService } from "./post.service"

@ApiTags("Posts")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "Get posts" })
  @ApiResponse({ status: 200, type: [PostType] })
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() queryDto: GetAllPostDto) {
    return this.postService.findAll(queryDto)
  }

  @ApiOperation({ summary: "Take 5 posts" })
  @ApiResponse({ status: 200, type: [PostType] })
  @UsePipes(new ValidationPipe())
  @Get("some")
  takePart(@Query() queryDto: GetAllPostDto) {
    return this.postService.takeSome(queryDto)
  }

  @ApiOperation({ summary: "Get post by ID" })
  @ApiResponse({ status: 200, type: PostType })
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.postService.getById(id)
  }

  @Post()
  @ApiOperation({ summary: "Create post" })
  @ApiResponse({ status: 200, type: PostType })
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@CurrentUser("id") id: string, @Body() dto: CreatePostDto) {
    return this.postService.create(dto, id)
  }
}
