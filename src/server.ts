import express from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'
const cors = require('cors')
import env from './config/env'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(router)

app.listen(env.port, () => {
  console.log(`http://localhost:${env.port}`)
})
