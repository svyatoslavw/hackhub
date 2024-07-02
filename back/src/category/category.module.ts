import { PrismaService } from "@/prisma.service"
import { Module } from "@nestjs/common"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService]
})
export class CategoryModule {}
