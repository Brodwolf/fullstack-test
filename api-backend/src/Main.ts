require('dotenv').config()

import cors from 'cors'
import { routes } from './routes/routes'
import express, { Express } from 'express'

// Import dos Middlewares
import { loggerMiddleware } from './middleware/Logger'
import { authMiddleware } from './middleware/AuthMiddleware'

const app: Express = express()
const port = process.env.SERVER_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors())
app.use(authMiddleware)
app.use(loggerMiddleware)

app.use('/api', [authMiddleware], routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
