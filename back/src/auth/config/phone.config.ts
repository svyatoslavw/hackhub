import { ConfigService } from "@nestjs/config"
import { TwilioModuleOptions } from "nestjs-twilio"

export const getPhoneConfig = async (
  configService: ConfigService
): Promise<TwilioModuleOptions> => {
  const accountSid = configService.get<string>("TWILIO_ACCOUNT_SID")
  const authToken = configService.get<string>("TWILIO_AUTH_TOKEN")

  return {
    accountSid,
    authToken
  }
}
