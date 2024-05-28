import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { SetMetadata } from '@nestjs/common'

const IS_PUBLIC_KEY = 'wfewfewfewfewf'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }


    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ])



    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'kejnejrn!)(kjld!34nt5nekvne)_*&wprfef!@fyh62ewef',
      })
      request['user'] = payload

      console.log(payload)

      if (roles && roles.length > 0 && !roles.includes(payload.role)) {
        throw new BadRequestException('Недостаточно прав')
      }
    } catch(error) {
      throw new UnauthorizedException(error.message)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? []
 
    return type === 'Bearer' ? token : undefined
  }
}