import { PrismaService } from "@/prisma.service"
import { Module } from "@nestjs/common"
import { MessageController } from "./message.controller"
import { MessageService } from "./message.service"

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService]
})
export class MessageModule {}
