import { type NextFunction, type Request, type Response } from 'express'
import { InvalidParams } from '../exceptions/invalid-param'
import { AbstractHttpError, BadRequestError, InternalServerError, NotFoundError } from '../utils/http-erros'
import { DisciplineAlreadyExistError } from '../exceptions/discipline-already-exist'
import { EntityNotFoundError } from '../exceptions/entity-not-found'

export const errorTreatment = (error: Error, _req: Request, _res: Response, next: NextFunction): any => {
  if (error instanceof InvalidParams || error instanceof DisciplineAlreadyExistError) {
    next(new BadRequestError(error.message))
  } else if (error instanceof EntityNotFoundError) {
    next(new NotFoundError(error.message))
  } else if (error instanceof AbstractHttpError) {
    next(error)
  } else {
    console.log(error)
    next(new InternalServerError('Unexpected Error Happend'))
  }
}

export const errorHandler = (error: AbstractHttpError, _req: Request, res: Response, _next: NextFunction): any => {
  const { message, statusCode } = error
  return res.status(statusCode).json({ error: message })
}
