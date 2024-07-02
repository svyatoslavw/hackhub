import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { CreatePollDto, VoteInPollDto } from "./dto/poll.dto"
import { returnVoteObject } from "./entities/poll.entity"

@Injectable()
export class PollService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePollDto, id: string) {
    const poll = await this.prisma.poll.create({
      data: { question: dto.question, creator: { connect: { id } } }
    })

    for (const option of dto.options) {
      await this.prisma.option.create({
        data: {
          text: option.text,
          poll: { connect: { id: poll.id } }
        }
      })
    }

    return poll
  }

  async voteInPoll(dto: VoteInPollDto, id: string) {
    return await this.prisma.vote.create({
      data: {
        option: { connect: { id: dto.optionId } },
        user: { connect: { id } }
      },
      select: returnVoteObject
    })
  }

  remove(id: string) {
    return this.prisma.poll.delete({ where: { id } })
  }
}
