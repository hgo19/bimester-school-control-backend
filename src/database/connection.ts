import 'dotenv/config'
import mysql from 'mysql2/promise'

const dbPort = Number(process.env.DB_PORT) ?? 3306

const connection: mysql.Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: dbPort
})

export default connection
