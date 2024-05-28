import { BadRequestException, Body, Injectable } from "@nestjs/common"
import { SignUpDto } from "./dto/sign-up.dto"
import UserEntity from "../entities/user.entity"
import { Repository, UpdateResult } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { genSaltSync, hashSync } from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { SignInDto } from "./dto/sign-in.dto"
import { MailService } from "../mail/mail.service"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}


  public async sendCode(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } })
    user.code = this.generateCode()

    if (!await this.usersRepository.update(user.uuid, user)) {
      throw new BadRequestException('Произошла ошибка при записи в базу данных')
    }

    await this.mailService.sendUserConfirmation(email, user.code, user.username)

    return {
      statusCode: 200,
      body: {
        status: true
      }
    }
  }

  public async signIn(body: SignInDto) {
    const user = await this.findUserByEmail(body.email)
    await this.updateAccessToken(user)

    return {
      statusCode: 200,
      body: {
        accessToken: user.accessToken
      }
    }
  }

  public async signUp(body: SignUpDto): Promise<{ statusCode: number, data: any }> {
    const user = new UserEntity()

    user.email = body.email
    user.username = body.username
    user.password = hashSync(body.password, genSaltSync(3))
    user.code = this.generateCode()

    const savedUser = await this.usersRepository.save(user)

    if (!savedUser) {
    throw new BadRequestException('Ошибка при записи в базу данных')
    }

    await this.updateAccessToken(savedUser)
    await this.mailService.registerAdmin(savedUser.email, savedUser.username)

    return {
      statusCode: 200,
      data: {
        accessToken: savedUser.accessToken
      }
    }
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } })
  }

  public async updateUser(uuid: string, data: any): Promise<UpdateResult> {
    return await this.usersRepository.update(uuid, data)
  }

  private async updateAccessToken(user: UserEntity) {
    user.accessToken = await this.jwtService.signAsync({
      uuid: user.uuid,
      email: user.email,
      surname: user.surname,
      username: user.username,
      role: user.role,
      patronymic: user.patronymic,
      isTwoFactorAuth: user.isTwoFactorAuth
    })

    if (!await this.usersRepository.update(user.uuid, user)) {
      throw new BadRequestException("Ошибка при записи в базу данных")
    }
  }

  private generateCode() {
    return Math.floor(100000 + Math.random() * (999999 + 1 - 100000))
  }
}
