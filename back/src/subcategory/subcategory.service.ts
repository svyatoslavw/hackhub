import { PrismaService } from "@/prisma.service"
import { generateSlug } from "@/utils/helpers"
import { Injectable } from "@nestjs/common"
import { CreateSubCategoryDto } from "./dto/subcategory.dto"

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.subCategory.findMany()
  }

  getById(id: string) {
    return this.prisma.subCategory.findUnique({ where: { id } })
  }

  create(dto: CreateSubCategoryDto) {
    return this.prisma.subCategory.create({
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        category: { connect: { id: dto.categoryId } }
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} subcategory`
  }
}
