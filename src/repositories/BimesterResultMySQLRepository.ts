import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../protocols'
import { type ResultSetHeader, type Pool, type RowDataPacket } from 'mysql2/promise'

export class BimesterResultMySQLRepository implements BimesterResultRepository {
  private readonly persistence: Pool
  constructor (connection: Pool) {
    this.persistence = connection
  }

  async create (input: BimesterResultInput): Promise<BimesterResultOutput> {
    const query = 'INSERT INTO School.BimesterResult (bimester, discipline, grade) VALUES (?)'
    const [{ insertId }] = await this.persistence.execute<ResultSetHeader>(query, [input.bimester, input.discipline, input.grade])
    const findCreated = await this.findOne(insertId.toString())
    return findCreated
  }

  async findOne (id: string): Promise<BimesterResultOutput> {
    const query = 'SELECT * FROM School.BimesterResult AS b WHERE b.id = ?'
    const [[row]] = await this.persistence.execute<RowDataPacket[][] & BimesterResultOutput[]>(query, id)
    return row
  }
}
