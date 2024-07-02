import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateMessageDto } from "./dto/message.dto"
import { MessageType } from "./entities/message.entity"
import { MessageService } from "./message.service"

@ApiTags("Messages")
@Controller("messages")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2
  ) {}

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiResponse({ status: 200, type: MessageType })
  @ApiOperation({ summary: "Create message" })
  @Auth()
  @Post()
  async create(@CurrentUser("id") id: string, @Body() dto: CreateMessageDto) {
    const response = await this.messageService.create(dto, id)
    this.eventEmitter.emit("message.create", response)
    return response
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Update message" })
  @ApiResponse({ status: 200, type: MessageType })
  @Patch(":id")
  update(@Param("id") id: string) {
    return this.messageService.update(id)
  }

  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>",
    required: true
  })
  @ApiOperation({ summary: "Delete message" })
  @ApiResponse({ status: 200, type: MessageType })
  @Delete(":id")
  remove(@Param("id") messageId: string) {
    return this.messageService.remove(messageId)
  }
}
