import { Router } from 'express'
import { BimesterResultMySQLRepository } from '../repositories/BimesterResultMySQLRepository'
import connection from '../database/connection'
import { RemoveResult } from '../services/remove-result'
import { DeleteResultExpress } from '../controllers/delete-result-express'
import { idBodyValidations } from '../middlewares/validations'

const deleteResultRoute = Router()

const repository = new BimesterResultMySQLRepository(connection)
const service = new RemoveResult(repository)
const controller = new DeleteResultExpress(service)

deleteResultRoute.delete('/', idBodyValidations, controller.execute)

export default deleteResultRoute
