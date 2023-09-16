import mysql from 'mysql2/promise'
import fs from 'fs/promises'
import * as path from 'path'
import 'dotenv/config'

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

  // Executar o script SQL
  await connection.query(sql)

  // Fechar a conexão
  await connection.end()
}

const file = 'db.sql'
const absolutePath = path.resolve(__dirname, file)

// Exemplo de uso
runSqlScript(absolutePath)
  .then(() => { console.log('Script SQL executado com sucesso') })
  .catch((err) => { console.error('Erro ao executar script SQL:', err) })
