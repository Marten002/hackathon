import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import UserEntity from "./user.entity"
import EventEntity from "./event.entity"

@Entity('like')
class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.likes)
  public user: UserEntity

  @ManyToOne(() => EventEntity, (event: EventEntity) => event.likes)
  public event: EventEntity

  @CreateDateColumn( { name: 'created_at' })
  public createdAt: string

  @UpdateDateColumn( { name: 'updated_at' })
  public updatedAt: string
}

export default LikeEntity