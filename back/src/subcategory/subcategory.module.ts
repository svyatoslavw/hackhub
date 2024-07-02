import { PrismaService } from "@/prisma.service"
import { Module } from "@nestjs/common"
import { SubcategoryController } from "./subcategory.controller"
import { SubcategoryService } from "./subcategory.service"

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, PrismaService]
})
export class SubcategoryModule {}
