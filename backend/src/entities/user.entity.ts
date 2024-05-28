import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import EventEntity from './event.entity'
import LikeEntity from "./like.entity"
import CommentEntity from "./comment.entity"

@Entity('user')
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string

  @Column({ name: 'email', unique: true })
  public email: string

  @Column({ name: 'username' })
  public username: string

  @Column({ name: 'surname', nullable: true })
  public surname: string

  @Column({ name: 'patronymic', nullable: true })
  public patronymic: string

  @Column({ name: 'code' })
  public code: number

  @Column({ name: 'is_verify', default: false })
  public isVerify: boolean

  @Column({ name: 'sex', default: 'male' })
  public sex: string

  @Column({ name: 'password' })
  public password: string

  @OneToMany(() => EventEntity, (event: EventEntity) => event.user)
  public events: EventEntity[]

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.event)
  public likes: LikeEntity[]

  @OneToMany(() => CommentEntity, (like: CommentEntity) => like.event)
  public comments: CommentEntity[]

  @Column({ name: 'role', default: 'admin' })
  public role: string

  @Column({ name: 'access_token', nullable: true, type: 'text' })
  public accessToken: string

  @Column({ name: 'is_two_factor_auth', default: false })
  public isTwoFactorAuth: boolean

  @CreateDateColumn( { name: 'created_at' })
  public createdAt: string

  @UpdateDateColumn( { name: 'updated_at' })
  public updatedAt: string

  @ManyToMany(() => EventEntity)
  @JoinTable({ name: 'event_participant' })
  public myEvents: EventEntity[]


  public format() {
    return {
      username: this.username,
      surname: this.surname,
      patronymic: this.patronymic,
      sex: this.sex,
      isTwoFactorAuth: this.isTwoFactorAuth,
      email: this.email,
      uuid: this.uuid
    }
  }
}

export default UserEntity