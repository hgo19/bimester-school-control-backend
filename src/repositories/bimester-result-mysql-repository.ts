import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../interfaces'
import { type ResultSetHeader, type Pool, type RowDataPacket } from 'mysql2/promise'
import { type BimesterResultInDb } from '../interfaces/bimester-result-in-db'
import { type BimesterResultMapper } from '../mapper/bimester-result-mapper'

export class BimesterResultMySQLRepository implements BimesterResultRepository {
  private readonly _persistence: Pool
  private readonly _mapper: BimesterResultMapper
  constructor (connection: Pool, mapper: BimesterResultMapper) {
    this._persistence = connection
    this._mapper = mapper
  }

  async getByBimester (bimester: string): Promise<BimesterResultOutput[] | null> {
    const query = 'SELECT * FROM School.bimester_result WHERE bimestre = ?'
    const [rows] = await this._persistence.execute<RowDataPacket[] & BimesterResultInDb[]>(query, [bimester])
    const rowsTreatment = rows.map((e) => {
      const { id, bimestre, disciplina, nota, criadoEm, atualizadoEm } = e
      return this._mapper.toDomain({ id, bimestre, disciplina, nota, criadoEm, atualizadoEm })
    })

    return rowsTreatment as BimesterResultOutput[]
  }

  async hasBimesterRegistered (bimester: string, discipline: string): Promise<boolean> {
    const query = 'SELECT * FROM School.bimester_result AS b WHERE b.bimestre = ? AND b.disciplina = ?'
    const [[row]] = await this._persistence.execute<RowDataPacket[][] & BimesterResultInDb[]>(query, [bimester, discipline])
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
    const [{ insertId }] = await this._persistence.execute<ResultSetHeader>(query, params)
    const findCreated = await this.findOne(insertId)
    return findCreated as BimesterResultOutput
  }

  async findOne (id: number): Promise<BimesterResultOutput | null> {
    const query = 'SELECT * FROM School.bimester_result AS b WHERE b.id = ?'
    const [[row]] = await this._persistence.execute<RowDataPacket[][] & BimesterResultInDb[]>(query, [id])
    return this._mapper.toDomain(row)
  }

  async delete (id: string): Promise<void> {
    await this.findOne(Number(id))
    const query = 'DELETE FROM School.bimester_result WHERE id = ?'
    const idNumber = Number(id)
    await this._persistence.execute<ResultSetHeader>(query, [idNumber])
  }
}
