import { PrismaService } from "@/prisma.service"
import { UserService } from "@/user/user.service"
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { CreateConversationDto } from "./dto/conversation.dto"
import { returnConversationObject } from "./entities/conversation.entity"

@Injectable()
export class ConversationService {
  constructor(
    private readonly prisma: PrismaService,
    private userSevice: UserService
  ) {}

  async isCreated(userId: string, recipientId: string) {
    return this.prisma.conversation.findFirst({
      where: {
        OR: [
          {
            creator: { id: userId },
            recipient: { id: recipientId }
          },
          {
            creator: { id: recipientId },
            recipient: { id: userId }
          }
        ]
      }
    })
  }

  async create(dto: CreateConversationDto, id: string) {
    const recipient = await this.userSevice.findById(dto.id)
    if (!recipient) throw new NotFoundException("User not found")

    if (id === recipient.id) throw new NotFoundException("Can't create conversation with yourself")

    const exists = await this.isCreated(id, recipient.id)
    if (exists) throw new BadRequestException("Conversation already exists")

    const conversation = await this.prisma.conversation.create({
      data: { creator: { connect: { id } }, recipient: { connect: { id: recipient.id } } }
    })

    await this.prisma.message.create({
      data: {
        creator: { connect: { id } },
        conversation: { connect: { id: conversation.id } },
        content: dto.content
      }
    })

    return conversation
  }

  getAllByUserId(id: string) {
    return this.prisma.conversation.findMany({
      where: { OR: [{ creator: { id } }, { recipient: { id } }] },
      select: {
        ...returnConversationObject,
        messages: {
          take: 2,
          orderBy: { createdAt: "desc" }
        }
      }
    })
  }

  getById(id: string) {
    return this.prisma.conversation.findFirst({
      where: { id },
      select: returnConversationObject
    })
  }

  async delete(id: string) {
    return this.prisma.conversation.delete({ where: { id } })
  }
}
