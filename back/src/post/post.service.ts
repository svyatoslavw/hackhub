import { PaginationService } from "@/pagination/pagination.service"
import { PrismaService } from "@/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreatePostDto, EnumPostCreatedSort, EnumPostDateSort, GetAllPostDto } from "./dto/post.dto"
import { returnPostObject } from "./entities/post.entity"

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async findAll(dto: GetAllPostDto = {}) {
    const { perPage: take, skip } = this.paginationService.getPagination(dto)

    const filters = this.createFilter(dto)

    const posts = await this.prisma.post.findMany({
      select: returnPostObject,
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take
    })

    return { posts, length: await this.prisma.post.count({ where: filters }) }
  }

  async takeSome(dto: GetAllPostDto = {}) {
    const filters = this.createFilter(dto)

    const posts = await this.prisma.post.findMany({
      select: returnPostObject,
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      take: 5
    })

    return { posts, length: await this.prisma.post.count({ where: filters }) }
  }

  private getSortOption(sort: EnumPostCreatedSort): Prisma.PostOrderByWithRelationInput[] {
    switch (sort) {
      case EnumPostCreatedSort.NEWEST:
        return [{ createdAt: "desc" }]
      case EnumPostCreatedSort.OLDEST:
        return [{ createdAt: "asc" }]
      default:
        return [{ createdAt: "desc" }]
    }
  }

  private getCategoryFilter(subcategoryId: string): Prisma.PostWhereInput {
    return { subcategoryId }
  }

  private getDateRange(range: EnumPostDateSort) {
    switch (range) {
      case EnumPostDateSort.DAY:
        return { createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 1)) } }
      case EnumPostDateSort.WEEK:
        return { createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) } }
      case EnumPostDateSort.MONTH:
        return { createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } }
      case EnumPostDateSort.YEAR:
        return {
          createdAt: { gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
        }
    }
  }

  private getSearchTermFilter(searchTerm: string): Prisma.PostWhereInput {
    return {
      title: {
        contains: searchTerm,
        mode: "insensitive"
      }
    }
  }

  private createFilter(dto: GetAllPostDto): Prisma.PostWhereInput {
    const filters: Prisma.PostWhereInput[] = []

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

    if (dto.range) filters.push(this.getDateRange(dto.range))

    if (dto.subcategory) filters.push(this.getCategoryFilter(dto.subcategory))

    return filters.length ? { AND: filters } : {}
  }

  async getById(id: string) {
    return this.prisma.post.findUnique({ where: { id }, select: returnPostObject })
  }

  async create(dto: CreatePostDto, id: string) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        creator: { connect: { id } },
        subcategory: { connect: { id: dto.subcategoryId } }
      }
    })
  }
}
