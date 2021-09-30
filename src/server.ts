import 'express-async-errors'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import env from './config/env'
import { router } from './routes'
import { catchErros } from './middlewares/cacthErros'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(router)

app.use(catchErros)

app.listen(env.port, () => {
  console.log(`http://localhost:${env.port}`)
})
