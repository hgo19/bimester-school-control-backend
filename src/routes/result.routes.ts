import { Router } from 'express'
import { AddResultExpress } from '../controllers/add-result-express'
import { CreateResult } from '../services/create-result'
import { BimesterResult } from '../entity/bimester-result'
import { BimesterResultMySQLRepository } from '../repositories/BimesterResultMySQLRepository'
import connection from '../database/connection'
import { inputValidations } from '../middlewares/validations'
import { ListAllResults } from '../services/list-all-results'
import { GetAllResultsExpress } from '../controllers/get-all-results-express'
import { RemoveResult } from '../services/remove-result'
import { DeleteResultExpress } from '../controllers/delete-result-express'

const resultsRoutes = Router()

const bimesterEntity = new BimesterResult()
const bimesterRepository = new BimesterResultMySQLRepository(connection)

const createResultService = new CreateResult(bimesterEntity, bimesterRepository)
const addResultController = new AddResultExpress(createResultService)

const listAllService = new ListAllResults(bimesterRepository)
const getAllController = new GetAllResultsExpress(listAllService)

const removeService = new RemoveResult(bimesterRepository)
const deleteResultController = new DeleteResultExpress(removeService)

resultsRoutes.get('/', getAllController.execute)

resultsRoutes.post('/', inputValidations, addResultController.execute)

resultsRoutes.delete('/:id', deleteResultController.execute)

export default resultsRoutes
