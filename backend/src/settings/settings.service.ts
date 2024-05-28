import { BadRequestException, Injectable } from "@nestjs/common"
import _ from 'lodash'
import UserEntity from "../entities/user.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "../mail/mail.service"
import { genSaltSync, hashSync } from "bcrypt"

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mailService: MailService
  ) {}

  
  public async changeName(username: string, request: any) {
    const user = await this.usersRepository.findOne({ where: { uuid: request.user.uuid } })

    if (!user) {
      throw new BadRequestException("Ошибка при получении данных из базы")
    }

    user.username = username

    if (!await this.usersRepository.save(user)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async changePassword(password: string, request: any) {
    const user = await this.usersRepository.findOne({ where: { uuid: request.user.uuid } })

    if (!user) {
      throw new BadRequestException("Ошибка при получении данных из базы")
    }

    user.password = hashSync(password, genSaltSync(3))

    if (!await this.usersRepository.save(user)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }
}
