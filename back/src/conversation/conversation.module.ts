import { PrismaService } from "@/prisma.service"
import { UserService } from "@/user/user.service"
import { Module } from "@nestjs/common"
import { ConversationController } from "./conversation.controller"
import { ConversationService } from "./conversation.service"

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService, UserService]
})
export class ConversationModule {}
