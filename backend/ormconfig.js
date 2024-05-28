const { DataSource } = require("typeorm")
const pg = require('pg')


require('dotenv').config({path: '.env'})

const dataSource = new DataSource({
  type: 'postgres',
  driver: pg,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  maxQueryExecutionTime: 10
})

dataSource.initialize()

module.exports = dataSource