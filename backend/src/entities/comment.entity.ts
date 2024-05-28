import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import UserEntity from "./user.entity"
import EventEntity from "./event.entity"

@Entity('comment')
class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  public user: UserEntity

  @ManyToOne(() => EventEntity, (event: EventEntity) => event.comments)
  public event: EventEntity

  @Column({ name: 'message' })
  public message: string

  @CreateDateColumn( { name: 'created_at' })
  public createdAt: string

  @UpdateDateColumn( { name: 'updated_at' })
  public updatedAt: string
}

export default CommentEntity