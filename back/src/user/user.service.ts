import { PrismaService } from "@/prisma.service"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { GetAllUserDto } from "./dto/user.dto"
import { returnUserObject } from "./entities/user.entity"

@Injectable()
export class UserService {
  LOGIN_DATE_EXPIRE = new Date(new Date().setDate(new Date().getDate() + 3))

  constructor(private readonly prisma: PrismaService) {}

  async getAll(dto: GetAllUserDto = {}, excludeId: string) {
    const filters = this.createFilter(dto)

    return this.prisma.user.findMany({
      where: { ...filters, id: { not: excludeId } },
      select: returnUserObject
    })
  }

  private getSearchTermFilter(searchTerm: string): Prisma.UserWhereInput {
    return {
      OR: [
        {
          login: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: searchTerm,
            mode: "insensitive"
          }
        }
      ]
    }
  }

  private createFilter(dto: GetAllUserDto): Prisma.UserWhereInput {
    const filters: Prisma.UserWhereInput[] = []

    if (dto.username) filters.push(this.getSearchTermFilter(dto.username))

    return filters.length ? { AND: filters } : {}
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: returnUserObject
    })

    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findByPhone(phone: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone
      }
    })

    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async findByCredentials(loginOrEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginOrEmail }, { login: loginOrEmail }, { phone: loginOrEmail }]
      }
    })

    return user
  }

  async getProfile(id: string) {
    return this.findById(id)
  }

  async confirmProfile(id: string) {
    const user = await this.findById(id)

    if (!user) throw new NotFoundException("User not found")

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        isConfirmed: true
      }
    })
  }

  async lastLogin(id: string) {
    const user = await this.findById(id)

    if (!user) throw new NotFoundException("User not found")

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        loggedAt: this.LOGIN_DATE_EXPIRE
      }
    })
  }
}
