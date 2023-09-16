import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../interfaces'
import { type ResultSetHeader, type Pool, type RowDataPacket } from 'mysql2/promise'

interface BimesterResultInDb {
  id: number
  bimestre: string
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

  async hasBimesterRegistered (bimester: string, discipline: string): Promise<boolean> {
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
    return findCreated as BimesterResultOutput
  }

  async findOne (id: number): Promise<BimesterResultOutput | null> {
    const query = 'SELECT * FROM School.bimester_result AS b WHERE b.id = ?'
    const [[row]] = await this.persistence.execute<RowDataPacket[][] & BimesterResultInDb[]>(query, [id])
    return {
      id: row.id.toString(),
      bimester: row.bimestre,
      discipline: row.disciplina,
      grade: row.nota,
      createdAt: row.criadoEm,
      updatedAt: row.atualizadoEm
    }
  }

  async delete (id: string): Promise<void> {
    await this.findOne(Number(id))
    const query = 'DELETE FROM School.bimester_result WHERE id = ?'
    const idNumber = Number(id)
    await this.persistence.execute<ResultSetHeader>(query, [idNumber])
  }
}
