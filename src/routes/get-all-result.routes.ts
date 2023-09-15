import { Router } from 'express'
import { BimesterResultMySQLRepository } from '../repositories/BimesterResultMySQLRepository'
import connection from '../database/connection'
import { ListAllResults } from '../services/list-all-results'
import { GetAllResultsExpress } from '../controllers/get-all-results-express'

const getAllResultsRoute = Router()

const repository = new BimesterResultMySQLRepository(connection)
const service = new ListAllResults(repository)
const controller = new GetAllResultsExpress(service)

getAllResultsRoute.get('/', controller.execute)

export default getAllResultsRoute
