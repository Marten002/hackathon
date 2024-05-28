import { Injectable } from "@nestjs/common"
import _ from 'lodash'
import UserEntity from "../entities/user.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "../mail/mail.service"
import EventEntity from "src/entities/event.entity"
import dataSource from "ormconfig"

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private mailService: MailService
  ) {}

  public async usersByGender() {
    const users = await dataSource.getRepository(UserEntity)
      .createQueryBuilder('user')
      .getMany()

    const result = {
      male: 0,
      female: 0
    }

    for (let i = 0; i < users.length; i++) {
      const user = users[i]

      if (user.sex === 'male') {
        result.male += 1
      } else {
        result.female += 1
      }
    }

    return result
  }

  public async eventsByTags() {
    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .getMany()

    const result = {}

    for (let i = 0; i < events.length; i++) {
      const event = events[i]

      const tags = event.tags.indexOf(',') >= 0 ? event.tags.split(',') : []

      for (let j = 0; j < tags.length; j++) {
        const tag = tags[j]

        if (result.hasOwnProperty(tag)) {
          result[tag] = [...new Set([...result[tag], event.title])]
        }  else {
          result[tag] = [event.title]
        }
      }
    }

    return result
  }

  public async finishedEvents() {
    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .getMany()

    const date = new Date()

    const result = []

    for (let i = 0; i< events.length; i++) {
      const event = events[i]

      if (event.endDate < date.getTime()) {
        result.push(event.title)
      }
    }

    return result
  }

  public async participantsInEvents() {
    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.participants', 'p')
      .getMany()

    const result = []

    for (let i = 0; i < events.length; i++) {
      const event = events[i]

      result.push({
        event: event.title,
        participants: event.participants.length 
      })
    }

    return result.sort((a, b) => b.participants - a.participants)
  }

  public async favoriteEvents() {
    const events = await dataSource.getRepository(EventEntity)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.likes', 'l')
      .leftJoinAndSelect('l.user', 'lu')
      .leftJoinAndSelect('event.comments', 'c')
      .leftJoinAndSelect('c.user', 'cu')
      .getMany()

    const result = []

    for (let i = 0; i < events.length; i++) {
      const event = events[i]

      result.push({
        event: event.title,
        count: event.likes.length  + event.comments.length
      })
    }

    return result.sort((a, b) => b.participants - a.participants)
  }

  public async favoriteUser() {
    const users = await this.usersRepository.find({ relations: { comments: true, likes: true } })


      console.log(users)

    let favorite = users?.[0]

    for (let i = 0; i < users.length; i++) {
      const user = users[i]

      if (user.likes.length + user.comments.length > favorite.likes.length + favorite.comments.length) {
        favorite = user
      }
    }

    return {
      username: favorite.username,
      count: favorite.likes.length + favorite.comments.length 
    }
  }
}
