import express from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'
import env from './config/env'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(router)

app.listen(env.port, () => {
  console.log(`http://localhost:${env.port}`)
})
