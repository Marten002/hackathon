import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"
import UserEntity from "../entities/user.entity"
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MailModule } from 'src/mail/mail.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailModule
  ]
})
export class UserModule {}
