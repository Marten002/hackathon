import { Module } from "@nestjs/common"
import { MailService } from "./mail.service"
import { MailerModule } from "@nestjs-modules/mailer"
import { join } from "path"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "fedyakov.mikhail@gmail.com",
          pass: "pgfj ebrg iayd tgew",
        },
      },
      defaults: {
        from: "fedyakov.mikhail@gmail.com",
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      }
    })
  ],
  exports: [MailService]
})
export class MailModule {}
