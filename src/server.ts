import express from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from './config/env'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  app.use(cors())
  next()
})

app.use(router)

app.listen(env.port, () => {
  console.log(`http://localhost:${env.port}`)
})
