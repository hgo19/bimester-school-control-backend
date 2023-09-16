import express from 'express'
import cors from 'cors'
import { errorHandler, errorTreatment } from './middlewares/error-handler'
import resultsRoutes from './routes/result.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/results', resultsRoutes)

app.use(errorTreatment)
app.use(errorHandler)

export default app
