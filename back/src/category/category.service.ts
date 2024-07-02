import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/category.dto"
import { returnCategoryObject } from "./entities/category.entity"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({ select: returnCategoryObject })
  }

  async findById(id: string) {
    return this.prisma.category.findUnique({ where: { id }, select: returnCategoryObject })
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { name: dto.name, icon: dto.icon },
      select: returnCategoryObject
    })
  }
}
