import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { PassportModule } from "@nestjs/passport"
import { MulterModule } from "@nestjs/platform-express"
import { ServeStaticModule } from "@nestjs/serve-static"
import { path } from "app-root-path"
import { AuthModule } from "./auth/auth.module"
import { CategoryModule } from "./category/category.module"
import { CommentModule } from "./comment/comment.module"
import { ConversationModule } from "./conversation/conversation.module"
import { GatewayModule } from "./gateway/gateway.module"
import { MediaModule } from "./media/media.module"
import { MessageModule } from "./message/message.module"
import { NewsModule } from "./news/news.module"
import { PollModule } from "./poll/poll.module"
import { PostModule } from "./post/post.module"
import { PrismaService } from "./prisma.service"
import { SubcategoryModule } from "./subcategory/subcategory.module"
import { UserModule } from "./user/user.module"
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    SubcategoryModule,
    MediaModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({ rootPath: `${path}/uploads`, serveRoot: "/uploads" }),
    MulterModule.register(),
    CommentModule,
    PollModule,
    NewsModule,
    GatewayModule,
    MessageModule,
    ConversationModule,
    EventEmitterModule.forRoot(),
    PaginationModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
