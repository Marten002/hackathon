import { MonitoringModule } from './monitoring/monitoring.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from "@nestjs/jwt"
import { MailModule } from "./mail/mail.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './user/user.module'
import UserEntity from './entities/user.entity'
import { SettingsModule } from './settings/settings.module'
import EventEntity from './entities/event.entity'
import LikeEntity from './entities/like.entity'
import CommentEntity from './entities/comment.entity'
import { EventModule } from './event/event.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule.register({
      global: true,
      secret: 'kejnejrn!)(kjld!34nt5nekvne)_*&wprfef!@fyh62ewef',
      signOptions: { expiresIn: '1y' },
    }),
    AuthModule,
    MailModule,
    UserModule,
    SettingsModule,
    EventModule,
    MonitoringModule,
    TelegramModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity, EventEntity, LikeEntity, CommentEntity],
        maxQueryExecutionTime: 10,
        synchronize: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
