import { AuthenticatedSocket } from "@/utils/interfaces"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Socket } from "socket.io"
import { UserService } from "../user/user.service"

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void

type JwtTokenPayload = { id: string }

export const AuthWsMiddleware = (
  jwtService: JwtService,
  configService: ConfigService,
  userService: UserService
): SocketMiddleware => {
  return async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake?.auth?.token

      if (!token) {
        throw new Error("Authorization token is missing")
      }

      let payload: JwtTokenPayload | null = null

      try {
        payload = await jwtService.verifyAsync<JwtTokenPayload>(token, {
          secret: configService.get<string>("JWT_SECRET")
        })
      } catch (error) {
        throw new Error("Authorization token is invalid")
      }

      const user = await userService.findById(payload.id)

      if (!user) {
        throw new Error("User does not exist")
      }

      socket = Object.assign(socket, {
        user: user!
      })
      next()
    } catch (error) {
      next(new Error("Unauthorized"))
    }
  }
}
