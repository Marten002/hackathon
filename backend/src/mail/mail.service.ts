//import { RestService } from './../rest/rest.service';
import { Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    //private restService: RestService
    ) {}

  async sendUserConfirmation(email: string, code: number, username: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Код подтверждения',
      template: '../../../../src/mail/templates/confirmation.pug',
      context: {
        code: code,
        username: username
      },
    })
  }

  async sendPassword(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Временный пароль от страницы',
      template: '../../../../src/mail/templates/password.pug',
      context: {
        password: password
      },
    })
  }

  async registerAdmin(email: string, username: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Поздравляем с регистрацией',
      template: '../../../../src/mail/templates/admin-register.pug',
      context: {
        username: username
      },
    })
  }

  async registerUser(email: string, username: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Поздравляем с регистрацией',
      template: '../../../../src/mail/templates/user-register.pug',
      context: {
        username: username,
        email: email,
        password: password
      },
    })
  }

  async event(email: string, username: string, eventName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Напоминаем! Завтра ${eventName}`,
      template: '../../../../src/mail/templates/event.pug',
      context: {
        username: username,
        eventName: eventName
      },
    })
  }
}