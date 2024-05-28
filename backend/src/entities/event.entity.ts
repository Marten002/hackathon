import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import UserEntity from "./user.entity"
import LikeEntity from "./like.entity"
import CommentEntity from "./comment.entity"

@Entity('event')
class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string

  @Column({ name: 'title' })
  public title: string

  @Column({ name: 'description' })
  public description: string

  @Column({ name: 'tags', default: '' })
  public tags: string

  @Column({ name: 'is_private', default: false })
  public isPrivate: boolean

  @Column({ name: 'start_date', nullable: true })
  public startDate: number

  @Column({ name: 'end_date', nullable: true })
  public endDate: number

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.events)
  public user: UserEntity

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'event_participant' })
  public participants: UserEntity[]

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.event)
  public likes: LikeEntity[]

  @OneToMany(() => CommentEntity, (like: CommentEntity) => like.event)
  public comments: CommentEntity[]

  @CreateDateColumn( { name: 'created_at' })
  public createdAt: string

  @UpdateDateColumn( { name: 'updated_at' })
  public updatedAt: string
}

export default EventEntity