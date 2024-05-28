import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"
import UserEntity from "../entities/user.entity"
import { MailModule } from 'src/mail/mail.module'
import { EventController } from './event.controller'
import LikeEntity from 'src/entities/like.entity'
import CommentEntity from 'src/entities/comment.entity'
import EventEntity from 'src/entities/event.entity'
import { EventService } from './event.service'

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, LikeEntity, CommentEntity, EventEntity]),
    MailModule
  ]
})
export class EventModule {}
