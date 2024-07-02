import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreateCommentDto } from "./dto/comment.dto"
import { returnCommentObject } from "./entities/comment.entity"

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.comment.findMany({ select: returnCommentObject })
  }

  async create(id: string, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        post: { connect: { id: dto.postId } },
        creator: { connect: { id } }
      },
      select: returnCommentObject
    })
  }

  remove(id: number) {
    return `This action removes a #${id} comment`
  }
}
