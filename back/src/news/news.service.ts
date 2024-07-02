import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreateNewsDto, UpdateNewsDto } from "./dto/news.dto"

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNewsDto, id: string) {
    return this.prisma.news.create({
      data: {
        content: dto.content,
        creator: { connect: { id } }
      }
    })
  }

  update(id: string, dto: UpdateNewsDto) {}

  remove(id: string) {
    return `This action removes a #${id} news`
  }
}
