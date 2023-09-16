import { type NextFunction, type Request, type Response } from 'express'
import { type ListByBimester } from '../services/list-by-bimester'

export class GetByBimesterExpress {
  private readonly _service: ListByBimester
  constructor (service: ListByBimester) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bimester } = req.body
      const listOfResults = await this._service.execute(bimester)
      return res.status(200).json(listOfResults)
    } catch (error) {
      next(error)
    }
  }
}
