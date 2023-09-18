import { type NextFunction, type Request, type Response } from 'express'
import { BadRequestError } from '../utils/http-erros'

export const inputValidations = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const properties = ['bimester', 'discipline', 'grade']
    properties.forEach((prop) => {
      if (!(prop in req.body)) {
        throw new BadRequestError(`Body in the request is missing: '${prop}' property.`)
      }
    })
    next()
  } catch (error) {
    next(error)
  }
}
