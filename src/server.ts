import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { router } from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(router)

app.listen(process.env.port, () => {
  console.log('Estamos no ar')
})
