import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../protocols'
import { type ResultSetHeader, type Pool, type RowDataPacket } from 'mysql2/promise'

interface BimesterResultInDb {
  id: number
  bimestere: string
  disciplina: string
  nota: number
  criadoEm: string
  atualizadoEm?: string
}

export class BimesterResultMySQLRepository implements BimesterResultRepository {
  private readonly persistence: Pool
  constructor (connection: Pool) {
    this.persistence = connection
  }

  async getAll (): Promise<BimesterResultOutput[]> {
    const query = 'SELECT * FROM School.bimester_result'
    const [rows] = await this.persistence.execute<RowDataPacket[] & BimesterResultInDb[]>(query)
    const rowsTreatment = rows.map((e) => ({
      id: e.id.toString(),
      bimester: e.bimestere,
      discipline: e.disciplina,
      grade: e.nota,
      createdAt: e.criadoEm,
      updatedAt: e.atualizadoEm
    }))

    return rowsTreatment
  }

  async isThereAlready (bimester: string, discipline: string): Promise<boolean> {
    const query = 'SELECT * FROM School.bimester_result AS b WHERE b.bimestre = ? AND b.disciplina = ?'
    const [[row]] = await this.persistence.execute<RowDataPacket[][] & BimesterResultInDb[]>(query, [bimester, discipline])
    if (row !== undefined) {
      return true
    } else {
      return false
    }
  }

  async create (input: BimesterResultInput): Promise<BimesterResultOutput> {
    const query = 'INSERT INTO School.bimester_result (bimestre, disciplina, nota) VALUES (?, ?, ?)'
    const { bimester, discipline, grade } = input
    const params = [bimester, discipline, grade]
    const [{ insertId }] = await this.persistence.execute<ResultSetHeader>(query, params)
    const findCreated = await this.findOne(insertId)
    return findCreated
  }

  async findOne (id: number): Promise<BimesterResultOutput> {
    const query = 'SELECT * FROM School.bimester_result AS b WHERE b.id = ?'
    const [[row]] = await this.persistence.execute<RowDataPacket[][] & BimesterResultInDb[]>(query, [id])
    return {
      id: row.id.toString(),
      bimester: row.bimestere,
      discipline: row.disciplina,
      grade: row.nota,
      createdAt: row.criadoEm,
      updatedAt: row.atualizadoEm
    }
  }

  async delete (id: string): Promise<boolean> {
    const query = 'DELETE FROM School.bimester_result WHERE id = ?'
    const idNumber = Number(id)
    const [result] = await this.persistence.execute<ResultSetHeader>(query, [idNumber])
    if (result.affectedRows > 0) {
      return false
    }
    return true
  }
}
