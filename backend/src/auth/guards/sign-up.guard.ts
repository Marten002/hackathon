import { Injectable, CanActivate, ExecutionContext, BadRequestException, HttpExceptionOptions } from "@nestjs/common"
import { Observable } from 'rxjs'
import { AuthService } from "../auth.service"

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const { email, password, username } = context.switchToHttp().getRequest().body

    if (!email) {
      throw new BadRequestException("Email не может быть пустым")
    }

    if (!password) {
      throw new BadRequestException("Пароль не может быть меньше 6 символов")
    }

    if (!username) {
      throw new BadRequestException("Имя не может быть пустым")
    }

    if (await this.authService.findUserByEmail(email)) {
      throw new BadRequestException('Пользователь с таким Email уже существует')
    }

    return true
  }
}