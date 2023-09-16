import { Router } from 'express'

import { BimesterResult } from '../entity/bimester-result'

import { BimesterResultMySQLRepository } from '../repositories/bimester-result-mysql-repository'
import connection from '../database/connection'

import { CreateResult } from '../services/create-result'
import { ListByBimester } from '../services/list-by-bimester'
import { RemoveResult } from '../services/remove-result'

import { AddResultExpress } from '../controllers/add-result-express'
import { GetByBimesterExpress } from '../controllers/get-by-bimester-result-express'
import { DeleteResultExpress } from '../controllers/delete-result-express'

import { inputValidations } from '../middlewares/validations'
import { BimesterResultMapper } from '../mapper/bimester-result-mapper'

const resultsRoutes = Router()

const bimesterEntity = new BimesterResult()
const bimesterResultMapper = new BimesterResultMapper()
const bimesterRepository = new BimesterResultMySQLRepository(connection, bimesterResultMapper)

const createResultService = new CreateResult(bimesterEntity, bimesterRepository)
const addResultController = new AddResultExpress(createResultService)

const listByBimesterService = new ListByBimester(bimesterRepository)
const getByBimesterService = new GetByBimesterExpress(listByBimesterService)

const removeService = new RemoveResult(bimesterRepository)
const deleteResultController = new DeleteResultExpress(removeService)

resultsRoutes.get('/', getByBimesterService.execute)

resultsRoutes.post('/', inputValidations, addResultController.execute)

resultsRoutes.delete('/:id', deleteResultController.execute)

export default resultsRoutes
