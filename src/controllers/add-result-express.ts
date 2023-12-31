import { type NextFunction, type Request, type Response } from 'express'
import { type CreateResult } from '../services/create-result'

export class AddResultExpress {
  private readonly _service: CreateResult
  constructor (service: CreateResult) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bimester, discipline, grade } = req.body
      const createdResult = await this._service.execute({ bimester, discipline, grade })
      return res.status(201).json(createdResult)
    } catch (error) {
      next(error)
    }
  }
}
