import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { SignUpDto } from "./dto/sign-up.dto"
import { AuthService } from "./auth.service"
import { SignUpGuard } from "./guards/sign-up.guard"
import { SignInDto } from "./dto/sign-in.dto"
import { SignInGuard } from "./guards/sign-in.guard"
import { CheckCodeGuard } from "./guards/check-code.guard"
import { SendCodeGuard } from "./guards/send-code.guard";
import { ApiTags } from "@nestjs/swagger"

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('sign-up')
  @UseGuards(SignUpGuard)
  public signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body)
  }

  @Post('sign-in')
  @UseGuards(SignInGuard)
  public signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body)
  }

  @Post('check-code')
  @UseGuards(CheckCodeGuard)
  public checkCode() {
    return {
      status: 200,
      body: {
        status: true
      }
    }
  }

  @Post('send-code')
  @UseGuards(SendCodeGuard)
  public sendCode(@Body('email') email: string) {
    return this.authService.sendCode(email)
  }
}
