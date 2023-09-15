import express from 'express'
import cors from 'cors'
import createResultRoute from './routes/create-result.routes'
import { errorHandler, errorTreatment } from './middlewares/error-handler'
import getAllResultsRoute from './routes/get-all-result.routes'
import deleteResultRoute from './routes/delete-result.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/createresult', createResultRoute)
app.use('/listall', getAllResultsRoute)
app.use('/deleteresult', deleteResultRoute)

app.use(errorTreatment)
app.use(errorHandler)

export default app
