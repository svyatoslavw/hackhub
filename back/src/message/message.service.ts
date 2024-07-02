import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreateMessageDto } from "./dto/message.dto"

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto, id: string) {
    return this.prisma.message.create({
      data: {
        content: dto.content,
        conversation: { connect: { id: dto.conversationId } },
        creator: { connect: { id } }
      },
      select: {
        id: true,
        creator: {
          select: {
            id: true,
            login: true,
            image: true
          }
        },
        content: true,
        creatorId: true,
        conversationId: true,
        conversation: {
          select: {
            id: true,
            recipient: {
              select: {
                id: true,
                login: true,
                image: true
              }
            },
            creator: {
              select: {
                id: true,
                login: true,
                image: true
              }
            },
            creatorId: true,
            recipientId: true
          }
        }
      }
    })
  }

  update(id: string) {
    return `This action updates a #${id} message`
  }

  remove(id: string) {
    return this.prisma.message.delete({ where: { id } })
  }
}
