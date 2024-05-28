import { Controller, Get, UseGuards } from "@nestjs/common"
import { TelegramService } from "./telegram.service"
import { AuthGuard } from "src/auth/guards/auth.guard"

@Controller('api/telegram')
export class TelegramController {
    constructor(
        private telegramService: TelegramService
    ) {}


    @Get('message')
    @UseGuards(AuthGuard)
    public messages() {
        return this.telegramService.getMessages
    }
}