import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"
import UserEntity from "../entities/user.entity"
import { MonitoringController } from './monitoring.controller'
import { MonitoringService } from './monitoring.service'
import { MailModule } from 'src/mail/mail.module'
import EventEntity from 'src/entities/event.entity'

@Module({
  controllers: [MonitoringController],
  providers: [MonitoringService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, EventEntity]),
    MailModule
  ]
})
export class MonitoringModule {}
