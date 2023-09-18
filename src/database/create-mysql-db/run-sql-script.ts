import mysql, { type Connection, type ResultSetHeader } from 'mysql2/promise'
import fs from 'fs/promises'
import * as path from 'path'
import 'dotenv/config'

async function databaseExists (connection: Connection, databaseName: string): Promise<boolean> {
  try {
    const [rows] = await connection.query('SHOW DATABASES LIKE ?', [databaseName])
    return (rows as ResultSetHeader[]).length > 0
  } catch (error) {
    console.error('Erro ao verificar a existência do banco de dados:', error)
    return false
  }
}

async function runSqlScript (filePath: string): Promise<void> {
  // Ler o conteúdo do arquivo SQL
  const sql = await fs.readFile(filePath, 'utf-8')

  // Criar uma conexão com o banco de dados
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST ?? 'localhost',
    user: process.env.MYSQL_USER ?? 'root',
    password: process.env.MYSQL_PASSWORD ?? 'password',
    port: Number(process.env.DB_PORT) ?? 3306,
    multipleStatements: true
  })

  const databaseName = 'School' // Substitua pelo nome de seu banco de dados

  // Verificar se o banco de dados já existe
  const databaseAlreadyExists = await databaseExists(connection, databaseName)

  if (databaseAlreadyExists) {
    console.log(`O banco de dados "${databaseName}" já existe, o script SQL não será executado.`)
  } else {
    // Executar o script SQL se o banco de dados não existir
    await connection.query(sql)
    console.log('Script SQL executado com sucesso.')
  }

  // Fechar a conexão
  await connection.end()
}

const file = 'db.sql'
const absolutePath = path.resolve(__dirname, file)

// Exemplo de uso
runSqlScript(absolutePath)
  .then(() => {
    console.log('Script SQL executado com sucesso')
  })
  .catch((err) => {
    console.error('Erro ao executar script SQL:', err)
  })
