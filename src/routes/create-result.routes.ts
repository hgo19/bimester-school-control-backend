import { Router } from 'express'
import { AddResultExpress } from '../controllers/add-result-express'
import { CreateResult } from '../services/create-result'
import { BimesterResult } from '../entity/bimester-result'
import { BimesterResultMySQLRepository } from '../repositories/BimesterResultMySQLRepository'
import connection from '../database/connection'
import { inputValidations } from '../middlewares/validations'

const createResultRoute = Router()

const entity = new BimesterResult()
const repository = new BimesterResultMySQLRepository(connection)
const service = new CreateResult(entity, repository)
const controller = new AddResultExpress(service)

createResultRoute.post('/', inputValidations, controller.execute)

export default createResultRoute
