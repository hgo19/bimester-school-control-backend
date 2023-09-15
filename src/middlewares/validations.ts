import { type NextFunction, type Request, type Response } from 'express'
import { BadRequestError } from '../utils/http-erros'

export const inputValidations = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const properties = ['bimester', 'discipline', 'grade']
    if (!properties.every(prop => prop in req.body)) {
      throw new BadRequestError("The request body should include the following properties: 'bimester', 'discipline', 'grade'.")
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const idBodyValidations = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const { id } = req.body
    if (id === false) {
      throw new BadRequestError("You need to put 'id' on your body request.")
    } else if (typeof id !== 'string') {
      throw new BadRequestError("The 'id' property must be a string.")
    }
    next()
  } catch (error) {
    next(error)
  }
}
