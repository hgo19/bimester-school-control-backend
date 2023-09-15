import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../protocols'
import { type ResultSetHeader, type Pool, type RowDataPacket } from 'mysql2/promise'

export class BimesterResultMySQLRepository implements BimesterResultRepository {
  private readonly persistence: Pool
  constructor (connection: Pool) {
    this.persistence = connection
  }

  async isThereAlready (bimester: string, discipline: string): Promise<boolean> {
    const query = 'SELECT * FROM School.BimesterResult AS b WHERE b.bimester = ? AND b.discipline = ?'
    const [[row]] = await this.persistence.execute<RowDataPacket[][] & BimesterResultOutput[]>(query, [bimester, discipline])
    if (row !== undefined && row.length > 0) {
      return true
    } else {
      return false
    }
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
