import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreatePostDto } from "./dto/post.dto"
import { returnPostObject } from "./entities/post.entity"

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({ select: returnPostObject })
  }

  async getById(id: string) {
    return this.prisma.post.findUnique({ where: { id }, select: returnPostObject })
  }

  async create(dto: CreatePostDto, id: string) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        creator: { connect: { id } },
        subcategory: { connect: { id: dto.subcategoryId } }
      }
    })
  }
}
