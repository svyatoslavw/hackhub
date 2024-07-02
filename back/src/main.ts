import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"
import * as passport from "passport"
import { AppModule } from "./app.module"
import { WebsocketAdapter } from "./gateway/gateway.adapter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const adapter = new WebsocketAdapter(app)
  app.useWebSocketAdapter(adapter)
  app.setGlobalPrefix("api")
  app.use(cookieParser())
  app.use(
    session({
      name: "sessionToken",
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 0
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type, Authorization, Access-Control-Allow-Origin"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
  })

  const config = new DocumentBuilder()
    .setTitle("HackHub")
    .setDescription("HackHub API")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  await app.listen(4000)
}
bootstrap()
