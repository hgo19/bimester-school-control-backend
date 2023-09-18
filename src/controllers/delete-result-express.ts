import { type RemoveResult } from '../services/remove-result'
import { type NextFunction, type Request, type Response } from 'express'

export class DeleteResultExpress {
  private readonly _service: RemoveResult
  constructor (service: RemoveResult) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id } = req.params
      await this._service.execute(id)
      res.status(204).json({ message: 'result deleted.' })
    } catch (error) {
      next(error)
    }
  }
}
