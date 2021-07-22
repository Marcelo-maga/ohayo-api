import { Router } from 'express'

const UserController = require('./controllers/UserController')

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')
})

router.post('/users', UserController.store)
router.post('/login', UserController.login)

export { router }
