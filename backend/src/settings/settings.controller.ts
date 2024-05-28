import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { SettingsService } from "./settings.service"
import { ApiHeader, ApiTags } from "@nestjs/swagger"

@ApiTags('settings')
@ApiHeader({ name: 'authorization' })
@Controller('api/settings')
export class SettingsController {
  constructor(
    private settingsService: SettingsService
  ) {}


  @Post('change-name')
  @UseGuards(AuthGuard)
  public changeName(@Body('username') username: string, @Req() request: any) {
    return this.settingsService.changeName(username, request)
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  public changePassword(@Body('password') password: string, @Req() request: any) {
    return this.settingsService.changePassword(password, request)
  }
}
