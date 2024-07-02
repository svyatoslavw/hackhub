import { returnUserObject } from "@/user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"
import { Option, Poll, Prisma, Vote } from "@prisma/client"

export class OptionType implements Option {
  @ApiProperty({ example: "1", description: "Post id" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "Option 1", description: "Poll option" })
  text: string
  @ApiProperty({ example: "1", description: "Poll id" })
  pollId: string
}

export const returnOptionObject: Prisma.OptionSelect = {
  id: true,
  createdAt: true,
  text: true,
  pollId: true,
  poll: true,
  votes: true
}

export class PollType implements Poll {
  @ApiProperty({ example: "1", description: "Post id" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "Question", description: "Poll question" })
  question: string
  @ApiProperty({ type: [OptionType] })
  options: OptionType[]
  @ApiProperty({ example: "1", description: "User id" })
  creatorId: string
}

export const returnPollObject: Prisma.PollSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  question: true,
  options: { select: returnOptionObject },
  creatorId: true,
  creator: { select: returnUserObject }
}

export class VoteType implements Vote {
  @ApiProperty({ example: "1", description: "Post id" })
  id: string
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post creation date" })
  createdAt: Date
  @ApiProperty({ example: "2022-01-01T00:00:00.000Z", description: "Post update date" })
  updatedAt: Date
  @ApiProperty({ example: "1", description: "Option id" })
  optionId: string
  @ApiProperty({ example: "1", description: "User id" })
  userId: string
}

export const returnVoteObject: Prisma.VoteSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  optionId: true,
  option: { select: returnOptionObject },
  userId: true,
  user: { select: returnUserObject }
}
