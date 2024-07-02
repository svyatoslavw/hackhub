import { User } from "@prisma/client"
import { Socket } from "socket.io"

export interface AuthenticatedSocket extends Socket {
  user: User
}
