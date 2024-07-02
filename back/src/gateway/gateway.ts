import { ConversationType } from "@/conversation/entities/conversation.entity"
import { MessageType } from "@/message/entities/message.entity"
import { AuthenticatedSocket } from "@/utils/interfaces"
import { Inject } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets"
import { Server } from "socket.io"
import { GatewayService } from "./gateway.service"

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type, Authorization, Access-Control-Allow-Origin"]
  }
})
export class GatewayGateway {
  constructor(@Inject(GatewayService) private readonly gatewayService: GatewayService) {}

  @WebSocketServer()
  server: Server

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log("Incoming Connection")
    this.gatewayService.setUserSocket(socket.user.id, socket)
    socket.emit("connected", {})
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    console.log("handleDisconnect")
    console.log(`${socket.user.login} disconnected.`)
    this.gatewayService.removeUserSocket(socket.user.id)
  }

  @SubscribeMessage("onConversationJoin")
  onConversationJoin(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
    console.log(`${client.user.id} joined a Conversation of ID: ${data.conversationId}`)
    client.join(`conversation-${data.conversationId}`)
    console.log(client.rooms)
    client.to(`conversation-${data.conversationId}`).emit("userJoin")
  }

  @SubscribeMessage("onConversationLeave")
  onConversationLeave(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
    console.log("onConversationLeave")
    client.leave(`conversation-${data.conversationId}`)
    console.log(client.rooms)
    client.to(`conversation-${data.conversationId}`).emit("userLeave")
  }

  @SubscribeMessage("onTypingStart")
  onTypingStart(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
    console.log("onTypingStart")
    console.log(data.conversationId)
    console.log(client.rooms)
    client.to(`conversation-${data.conversationId}`).emit("onTypingStart")
  }

  @SubscribeMessage("onTypingStop")
  onTypingStop(@MessageBody() data: any, @ConnectedSocket() client: AuthenticatedSocket) {
    console.log("onTypingStop")
    console.log(data.conversationId)
    console.log(client.rooms)
    client.to(`conversation-${data.conversationId}`).emit("onTypingStop")
  }

  @OnEvent("message.create")
  handleMessageCreateEvent(payload: MessageType) {
    console.log("Inside message.create")

    const {
      creator: author,
      conversation: { creator, recipient }
    } = payload

    const authorSocket = this.gatewayService.getUserSocket(author.id)
    const recipientSocket =
      author.id === creator.id
        ? this.gatewayService.getUserSocket(recipient.id)
        : this.gatewayService.getUserSocket(creator.id)

    if (authorSocket) authorSocket.emit("onMessage", payload)
    if (recipientSocket) recipientSocket.emit("onMessage", payload)
  }

  @OnEvent("message.update")
  async handleMessageUpdate(message: MessageType) {
    const {
      creator: author,
      conversation: { creator, recipient }
    } = message
    console.log(message)
    const recipientSocket =
      author.id === creator.id
        ? this.gatewayService.getUserSocket(recipient.id)
        : this.gatewayService.getUserSocket(creator.id)
    if (recipientSocket) recipientSocket.emit("onMessageUpdate", message)
  }

  @OnEvent("conversation.create")
  handleConversationCreateEvent(payload: ConversationType) {
    console.log("Inside conversation.create")
    const recipientSocket = this.gatewayService.getUserSocket(payload.recipient.id)
    if (recipientSocket) recipientSocket.emit("onConversation", payload)
  }
}
