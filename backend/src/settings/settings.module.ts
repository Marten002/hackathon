import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"
import UserEntity from "../entities/user.entity"
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'
import { MailModule } from 'src/mail/mail.module'

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailModule
  ]
})
export class SettingsModule {}
