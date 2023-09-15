import { type NextFunction, type Request, type Response } from 'express'
import { type CreateResult } from '../services/create-result'

interface ObjectResponse {
  id: string
  bimestre: string
  disciplina: string
  nota: number
  criadoEm: string
  atualizadoEm?: string
}

export class AddResultExpress {
  private readonly _service: CreateResult
  constructor (service: CreateResult) {
    this._service = service
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bimester, discipline, grade } = req.body
      const createdResult = await this._service.execute({ bimester, discipline, grade })
      const result: ObjectResponse = {
        id: createdResult.id,
        bimestre: createdResult.bimester,
        disciplina: createdResult.discipline,
        nota: createdResult.grade,
        criadoEm: createdResult.createdAt
      }

      if (createdResult.updatedAt !== undefined) {
        result.atualizadoEm = createdResult.updatedAt
      }

      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}
