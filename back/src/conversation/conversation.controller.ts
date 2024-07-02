import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger"
import { ConversationService } from "./conversation.service"
import { CreateConversationDto } from "./dto/conversation.dto"

@ApiTags("Conversations")
@Controller("conversations")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Create a new conversation" })
  @Auth()
  @Post()
  create(@Body() dto: CreateConversationDto, @CurrentUser("id") id: string) {
    return this.conversationService.create(dto, id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiParam({ name: "id", type: String, description: "User ID" })
  @ApiOperation({ summary: "Get all conversations by user id" })
  @Auth()
  @Get()
  getAllByUserId(@CurrentUser("id") id: string) {
    return this.conversationService.getAllByUserId(id)
  }

  @ApiParam({ name: "id", type: String, description: "Conversation id" })
  @ApiOperation({ summary: "Get conversation by id" })
  @Auth()
  @Get(":id")
  getById(@Param("id") id: string) {
    return this.conversationService.getById(id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Delete a conversation" })
  @Auth()
  @Delete(":id")
  delete(@Param("id") conversationId: string) {
    return this.conversationService.delete(conversationId)
  }
}
