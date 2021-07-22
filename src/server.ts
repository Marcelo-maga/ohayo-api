import express from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(router)

app.listen(3333, () => {
  console.log('htpp://localhost:3333')
})
