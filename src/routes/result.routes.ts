import { Router } from 'express'

import { BimesterResult } from '../entity/bimester-result'

import { BimesterResultMySQLRepository } from '../repositories/bimester-result-mysql-repository'
import connection from '../database/connection'

import { CreateResult } from '../services/create-result'
import { ListAllResults } from '../services/list-all-results'
import { RemoveResult } from '../services/remove-result'

import { AddResultExpress } from '../controllers/add-result-express'
import { GetAllResultsExpress } from '../controllers/get-all-results-express'
import { DeleteResultExpress } from '../controllers/delete-result-express'

import { inputValidations } from '../middlewares/validations'

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
