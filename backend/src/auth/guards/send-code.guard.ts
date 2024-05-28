import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common"
import { Observable } from 'rxjs'
import { AuthService } from "../auth.service"

@Injectable()
export class SendCodeGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const { email } = context.switchToHttp().getRequest().body

    if (!email) {
      throw new BadRequestException("Email не может быть пустым")
    }

    const user = await this.authService.findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException("Пользователь не найден")
    }

    return true
  }
}