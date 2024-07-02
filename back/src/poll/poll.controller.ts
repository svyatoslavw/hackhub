import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Delete, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreatePollDto, VoteInPollDto } from "./dto/poll.dto"
import { PollType, VoteType } from "./entities/poll.entity"
import { PollService } from "./poll.service"

@ApiTags("Polls")
@Controller("polls")
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Create poll" })
  @ApiResponse({ status: 200, type: PollType })
  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  async create(@Body() dto: CreatePollDto, @CurrentUser("id") id: string) {
    return this.pollService.create(dto, id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Vote in poll" })
  @ApiResponse({ status: 200, type: VoteType })
  @UsePipes(new ValidationPipe())
  @Auth()
  @Post("vote")
  async voteInPoll(@Body() dto: VoteInPollDto, @CurrentUser("id") id: string) {
    return this.pollService.voteInPoll(dto, id)
  }

  @ApiOperation({ summary: "Delete poll" })
  @ApiResponse({ status: 200, type: VoteType })
  @Delete(":id")
  remove(@Param("id") pollId: string) {
    return this.pollService.remove(pollId)
  }
}
