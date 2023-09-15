import { type BimesterResultRepository } from '../protocols'

export class RemoveResult {
  private readonly _repository: BimesterResultRepository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (id: string): Promise<boolean> {
    const isDeleted = await this._repository.delete(id)
    if (!isDeleted) {
      throw new Error()
    }
    return isDeleted
  }
}
