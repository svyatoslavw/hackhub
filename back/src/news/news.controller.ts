import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateNewsDto, UpdateNewsDto } from "./dto/news.dto"
import { NewsType } from "./entities/news.entity"
import { NewsService } from "./news.service"

@ApiTags("News")
@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Add news" })
  @ApiResponse({ status: 200, type: NewsType })
  @Post()
  @Auth()
  create(@Body() dto: CreateNewsDto, @CurrentUser("id") id: string) {
    return this.newsService.create(dto, id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Update news" })
  @ApiResponse({ status: 200, type: NewsType })
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Delete news" })
  @ApiResponse({ status: 200, type: NewsType })
  @Delete(":id")
  remove(@Param("id") newsId: string) {
    return this.newsService.remove(newsId)
  }
}
