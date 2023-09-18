import { type NextFunction, type Request, type Response } from 'express'
import { type ListAllResults } from '../services/list-all-results'

export class GetAllResults {
  private readonly _service: ListAllResults
  constructor (service: ListAllResults) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const listOfResults = await this._service.execute()
      return res.status(200).json(listOfResults)
    } catch (error) {
      next(error)
    }
  }
}
