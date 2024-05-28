import { DataSource } from "typeorm"
import pg from 'pg'
import UserEntity from "src/entities/user.entity"
import CommentEntity from "src/entities/comment.entity"
import LikeEntity from "src/entities/like.entity"
import EventEntity from "src/entities/event.entity"

require('dotenv').config({path: '.env'})

const dataSource = new DataSource({
  type: 'postgres',
  driver: pg,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, CommentEntity, LikeEntity, EventEntity],
  synchronize: true,
  logging: false
})

dataSource.initialize()

export default dataSource