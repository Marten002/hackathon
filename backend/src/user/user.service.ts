import { BadRequestException, Injectable } from "@nestjs/common"
import _ from 'lodash'
import UserEntity from "../entities/user.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "../mail/mail.service"
import dataSource from "ormconfig"
import { ChangeDto } from "./dto/change.dto"
import { genSaltSync, hashSync } from "bcrypt"
import { CreateDto } from "./dto/create.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mailService: MailService
  ) {}

  public async getAll() {
    const users = await dataSource.getRepository(UserEntity)
      .createQueryBuilder()
      .getMany()

    const result = []

    for (let i = 0; i < users.length; i++) {
      const current = users[i]

      result.push({
        uuid: current.uuid,
        username: current.username,
        surname: current.surname,
        role: current.role,
        email: current.email,
        patronymic: current.patronymic,
        isTwoFactorAuth: current.isTwoFactorAuth,
        createdAt: current.createdAt,
        updatedAt: current.updatedAt
      })
    }

    return result
  }


  public async getOne(uuid: string) {
    const user = await this.usersRepository.findOne({ where: { uuid: uuid } })


    if (!user) {
      throw new BadRequestException('Пользователь не найден')
    }

    return {
      uuid: user.uuid,
      username: user.username,
      surname: user.surname,
      role: user.role,
      email: user.email,
      patronymic: user.patronymic,
      isTwoFactorAuth: user.isTwoFactorAuth,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  public async create(body: CreateDto): Promise<{ statusCode: number, data: any }> {
    const candidate = await this.usersRepository.findOne({ where: { email: body.email } })

    if (candidate) {
      throw new BadRequestException('Пользователь уже существует')
    }

    const user = new UserEntity()
    const password = this.generatePassword()

    user.email = body.email
    user.username = body.username
    user.password = hashSync(password, genSaltSync(3))
    user.accessToken = ''
    user.code = 123456

    if (body.role) {
      user.role = body.role
    }

    const savedUser = await this.usersRepository.save(user)

    if (!savedUser) {
      throw new BadRequestException('Ошибка при записи в базу данных')
    }

    await this.mailService.registerUser(savedUser.email, savedUser.username, password)

    if (savedUser.role === 'admin') {
      await this.mailService.registerAdmin(savedUser.email, savedUser.username)
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async change(data: ChangeDto) {
    const insertData = {...data}
    delete insertData.uuid

    if (insertData.password) {
      insertData.password = hashSync(insertData.password, genSaltSync(3))
    }

    if (!await this.usersRepository.update(data.uuid, insertData)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async delete(uuid: string) {
    const user = await this.usersRepository.findOne({ where: { uuid: uuid } })

    if (user.role === 'admin') {
      throw new BadRequestException("Админ не может удалить админа")
    }

    if (!await this.usersRepository.delete(uuid)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async deleteMany(uuids: string[]) {
    const result = []

    for (let i = 0; i < uuids.length; i++) {
      const uuid = uuids[i]
      const user = await this.usersRepository.findOne({ where: { uuid: uuid } })

      if (user.role === 'admin') {
        result.push({
          status: 'error',
          email: user.email,
          message: 'Админ не может удалить админа'
        })

        continue
      }

      if (!await this.usersRepository.delete(uuid)) {
        result.push({
          status: 'error',
          email: user.email,
          message: 'Ошибка записи в базу данных'
        })

        continue
      }

      result.push({
        status: 'success',
        email: user.email,
      })
    }

    return {
      statusCode: 200,
      data: result
    }
  }

  public async roles() {
    const roles = await dataSource.createQueryBuilder()
      .select('u.role')
      .from(UserEntity, 'u')
      .execute()

    return [...new Set(roles.map(user => user.u_role))]
  }

  private generatePassword(length = 5) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1
    }

    return result
  }
}
