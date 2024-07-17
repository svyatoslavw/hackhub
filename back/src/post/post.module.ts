import { PaginationService } from "@/pagination/pagination.service"
import { PrismaService } from "@/prisma.service"
import { Module } from "@nestjs/common"
import { PostController } from "./post.controller"
import { PostService } from "./post.service"

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PaginationService]
})
export class PostModule {}
