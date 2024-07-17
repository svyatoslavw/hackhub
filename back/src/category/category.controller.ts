import { Auth } from "@/auth/decorators/auth.decorator"
import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/category.dto"
import { CategoryType } from "./entities/category.entity"

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({ status: 200, type: [CategoryType] })
  @Get()
  async findAll() {
    return await this.categoryService.findAll()
  }

  @ApiOperation({ summary: "Get category by ID" })
  @ApiResponse({ status: 200, type: CategoryType })
  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.categoryService.findById(id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 200, type: CategoryType })
  @Auth()
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto)
  }
}
