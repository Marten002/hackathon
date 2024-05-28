import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common"
import { Observable } from 'rxjs'
import { AuthService } from "../auth.service"
import { compareSync } from "bcrypt"

@Injectable()
export class SignInGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const { email, password, code } = context.switchToHttp().getRequest().body

    if (!email) {
      throw new BadRequestException("Email не может быть пустым")
    }

    if (!password) {
      throw new BadRequestException("Пароль не может быть меньше 6 символов")
    }

    const user = await this.authService.findUserByEmail(email)

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException("Неверный логин или пароль")
    }

    if (user.isTwoFactorAuth && (!code || (code !== user.code))) {
      throw new UnauthorizedException("Некорректный код подтверждения")
    }

    return true
  }
}