import { type NextFunction, type Request, type Response } from 'express'
import { type ListAllResults } from '../services/list-all-results'

export class GetAllResultsExpress {
  private readonly _service: ListAllResults
  constructor (service: ListAllResults) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const listOfResults = await this._service.execute()
      const result = listOfResults.map((e) => ({
        id: e.id,
        bimestre: e.bimester,
        disciplina: e.discipline,
        nota: e.grade,
        criadoEm: e.createdAt,
        atualizadoEm: e.updatedAt
      }))

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
