import express from 'express'
import cors from 'cors'
import createResultRoute from './routes/create-result.routes'
import { errorHandler, errorTreatment } from './middlewares/error-handler'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/createresult', createResultRoute)
app.use(errorTreatment)
app.use(errorHandler)

export default app
