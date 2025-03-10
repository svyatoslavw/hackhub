import { Module } from "@nestjs/common"
import { GatewayGateway } from "./gateway"
import { GatewayService } from "./gateway.service"

@Module({
  providers: [GatewayGateway, GatewayService]
})
export class GatewayModule {}
