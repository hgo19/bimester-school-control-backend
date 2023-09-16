import { type BimesterResultRepository } from '../interfaces'

export class RemoveResult {
  private readonly _repository: BimesterResultRepository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (id: string): Promise<void> {
    const resultInDb = await this._repository.findOne(Number(id))
    if (resultInDb === null) {
      throw new Error()
    }
    await this._repository.delete(id)
  }
}
