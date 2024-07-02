import { UserService } from "@/user/user.service"
import { INestApplicationContext } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { IoAdapter } from "@nestjs/platform-socket.io"
import { AuthWsMiddleware } from "./gateway.middleware"

export class WebsocketAdapter extends IoAdapter {
  private jwtService: JwtService
  private configService: ConfigService
  private userService: UserService

  constructor(private app: INestApplicationContext) {
    super(app)
    this.jwtService = this.app.get(JwtService)
    this.configService = this.app.get(ConfigService)
    this.userService = this.app.get(UserService)
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options)
    server.use(AuthWsMiddleware(this.jwtService, this.configService, this.userService))
    return server
  }
}
