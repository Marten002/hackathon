import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from "@nestjs/typeorm"
import UserEntity from "../entities/user.entity"
import { MailModule } from "../mail/mail.module"

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailModule
  ]
})
export class AuthModule {}
