import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "../mail/mail.service"
import dataSource from "ormconfig"
import EventEntity from "src/entities/event.entity"
import { CreateDto } from "./dto/create.dto"
import UserEntity from "src/entities/user.entity"
import { ChangeDto } from "./dto/change.dto"
import { CreateCommentDto } from "./dto/create-comment.dto"
import CommentEntity from "src/entities/comment.entity"
import { DeleteCommentDto } from "./dto/delete-comment.dto"
import LikeEntity from "src/entities/like.entity"
import { SetLikeDto } from "./dto/set-like.dto"
import { Cron, CronExpression } from "@nestjs/schedule"
import { JoinManyDto } from "./dto/join-many.dto"

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
    private mailService: MailService
  ) {}

  public async getAll() {
    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.likes', 'l')
      .leftJoinAndSelect('event.participants', 'p')
      .leftJoinAndSelect('l.user', 'lu')
      .leftJoinAndSelect('event.comments', 'c')
      .leftJoinAndSelect('c.user', 'cu')
      .innerJoinAndSelect('event.user', 'u')
      .getMany()

    const result = []

    for (let i = 0; i < events.length; i++) {
      const current = events[i]
      result.push({
        uuid: current.uuid,
        title: current.title,
        description: current.description,
        isPrivate: current.isPrivate,
        likes: current.likes.map(like => like.user.email),
        comments: current.comments.map(like => ({
          uuid: like.uuid,
          message: like.message,
          username: like.user.username,
          createdAt: like.createdAt
        })),
        participants: current.participants.map(participant => participant.format()),
        user: current.user.format(),
        startDate: current.startDate,
        endDate: current.endDate,
        tags: current.tags.indexOf(',') >= 0 ? current.tags.split(',') : [],
        createdAt: current.createdAt,
        updatedAt: current.updatedAt
      })
    }

    return result
  }

  public async getOne(uuid: string) {
    const event = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.likes', 'l')
      .leftJoinAndSelect('event.participants', 'p')
      .leftJoinAndSelect('l.user', 'lu')
      .leftJoinAndSelect('event.comments', 'c')
      .leftJoinAndSelect('c.user', 'cu')
      .innerJoinAndSelect('event.user', 'u')
      .where('event.uuid = :uuid', { uuid: uuid })
      .getOne()


      if (!event) {
        throw new BadRequestException("Событие не найден")
      }

      return {
        uuid: event.uuid,
        title: event.title,
        description: event.description,
        isPrivate: event.isPrivate,
        likes: event.likes.map(like => like.user.email),
        comments: event.comments.map(like => ({
          uuid: like.uuid,
          message: like.message,
          username: like.user.username,
          createdAt: like.createdAt
        })),
        participants: event.participants.map(participant => participant.format()),
        user: event.user.format(),
        startDate: event.startDate,
        endDate: event.endDate,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        tags: event.tags.indexOf(',') >= 0 ? event.tags.split(',') : [],
      }
  }

  public async create(body: CreateDto, request: any) {
    const uuid = request.user.uuid

    const admin = await this.userRepository.findOne({ where: { uuid: uuid } })

    if (!admin) {
      throw new BadRequestException('Админ не найден')
    }

    const event = new EventEntity()

    event.endDate = body.endDate
    event.startDate = body.startDate
    event.title = body.title
    event.description = body.description
    event.isPrivate = body.isPrivate
    event.user = admin
    event.tags = body.tags ? body.tags.join(',') : ''

    if (!await this.eventRepository.save(event)) {
      throw new BadRequestException('Ошибка записи в базу данных')
    }

    return {
      endDate:  body.endDate,
      startDate: body.startDate,
      title: body.title,
      description: body.description,
      isPrivate: body.isPrivate,
      user: admin.format()
    }
  }

  public async change(data: ChangeDto) {
    const event = await this.eventRepository.findOne({ where: { uuid: data.uuid } })

    if (!event) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    const insertData = {
      ...data,
      tags: data.tags ? data.tags.join(',') : ''
    }
    delete insertData.uuid

    if (!await this.eventRepository.update(data.uuid, insertData)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async createComment(data: CreateCommentDto, request: any) {
    const event = await this.eventRepository.findOne({ where: { uuid: data.eventUuid } })
    const user = await this.userRepository.findOne({ where: { uuid: request.user.uuid } })
   
    if (!event || !user) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    
    const comment = new CommentEntity

    comment.event = event
    comment.user = user
    comment.message = data.message


    if (!await this.commentRepository.save(comment)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async deleteComment(data: DeleteCommentDto, request: any) {
    const user = await this.userRepository.findOne({ where: { uuid: request.user.uuid }})

    if (!user) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }

    const comment = await this.commentRepository.findOne({ where: { uuid: data.uuid }, relations: { user: true } })
   

    if (!comment || comment.user.uuid !== user.uuid) {
      throw new BadRequestException("Нельзя удалить чужой комментарий")
    }
    

    if (!await this.commentRepository.delete(comment.uuid)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }


  public async like(data: SetLikeDto, request: any) {
    const event = await this.eventRepository.findOne({ where: { uuid: data.eventUuid } })
    const user = await this.userRepository.findOne({ where: { uuid: request.user.uuid } })
   
    if (!event || !user) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    
    const candidate = await this.likeRepository.findOne({ 
      where: { 
        user: {
          uuid: user.uuid
        },
        event: {
          uuid: event.uuid
        },
      }, 
      relations: { user: true, event: true } 
    })

    if (candidate) {
      if (!await this.likeRepository.delete(candidate.uuid)) {
        throw new BadRequestException("Ошибка записи в базу данных")
      }

      return {
        statusCode: 200,
        data: {
          status: true,
          message: 'deleted'
        }
      } 
    }

    const like = new LikeEntity

    like.event = event
    like.user = user

    if (!await this.likeRepository.save(like)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true,
        message: 'created'
      }
    }
  }

  public async join(uuid, request: any) {
    const event = await this.eventRepository.findOne({ where: { uuid: uuid }, relations: { participants: true } })
    const user = await this.userRepository.findOne({ where: { uuid: request.user.uuid } })
   
    if (!event || !user) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    
    const candidate = event.participants.find(participant => participant.uuid === user.uuid)

    if (candidate) {
      throw new BadRequestException("Вы уже участвуйте в мероприятии")
    }

    event.participants = [...event.participants, user]

    if (!await this.eventRepository.save(event)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }

  public async joinMany(body: JoinManyDto) {
    const event = await this.eventRepository.findOne({ where: { uuid: body.eventUuid }, relations: { participants: true } })
    
    const users = []

    for (let i = 0; i < body.usersUuid.length; i++) {
      const uuid = body.usersUuid[i]
      const user = await this.userRepository.findOne({ where: { uuid: uuid } })

      if (!user || event.participants.find(participant => participant.uuid === user.uuid)) {
        continue
      }

      users.push(user)
    }

    if (!event) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    
    event.participants = [...event.participants, ...users]

    if (!await this.eventRepository.save(event)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }


  public async exit(uuid, request: any) {
    const event = await this.eventRepository.findOne({ where: { uuid: uuid }, relations: { participants: true } })
    const user = await this.userRepository.findOne({ where: { uuid: request.user.uuid } })
   
    if (!event || !user) {
      throw new BadRequestException("Ошибка получения данных из базы данных")
    }
    
    const result = []

    for (let i = 0; i < event.participants.length; i++) {
      const participant = event.participants[i]

      if (participant.uuid === user.uuid) {
        continue
      }

      result.push(participant)
    }

    event.participants = result

    if (!await this.eventRepository.save(event)) {
      throw new BadRequestException("Ошибка записи в базу данных")
    }

    return {
      statusCode: 200,
      data: {
        status: true
      }
    }
  }


  @Cron(CronExpression.EVERY_12_HOURS)
  public async cron() {
    const logger = new Logger('Events')

    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.likes', 'l')
      .leftJoinAndSelect('event.participants', 'p')
      .leftJoinAndSelect('l.user', 'lu')
      .leftJoinAndSelect('event.comments', 'c')
      .leftJoinAndSelect('c.user', 'cu')
      .innerJoinAndSelect('event.user', 'u')
      .getMany()


    for (let i = 0; i < events.length; i++) {
      const event = events[i]

      const date = new Date()

      if (event.startDate - date.getTime() < 60 * 60 * 24) {
          for (let i = 0; i < event.participants.length; i++) {
            const participant = event.participants[i]
            await this.mailService.event(participant.email, participant.username, event.title)
            logger.error(`Отправлена на email ${participant.email}`)
          }
      }      
    }
  }
}
