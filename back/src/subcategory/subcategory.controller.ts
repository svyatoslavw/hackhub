import { Auth } from "@/auth/decorators/auth.decorator"
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateSubCategoryDto } from "./dto/subcategory.dto"
import { SubcategoryType } from "./entities/subcategory.entity"
import { SubcategoryService } from "./subcategory.service"

@ApiTags("Subcategories")
@Controller("subcategory")
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  @ApiOperation({ summary: "Get all subcategories" })
  @ApiResponse({ status: 200, type: [SubcategoryType] })
  findAll() {
    return this.subcategoryService.getAll()
  }

  @ApiParam({ name: "id", type: String, description: "Subcategory id" })
  @ApiOperation({ summary: "Get subcategory by id" })
  @Get(":id")
  getById(@Param("id") id: string) {
    return this.subcategoryService.getById(id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Create subcategory" })
  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(@Body() dto: CreateSubCategoryDto) {
    return this.subcategoryService.create(dto)
  }
}
