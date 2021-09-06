import { Router } from 'express'

const UserController = require('./controllers/UserController')

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')// rota de teste
})

router.post('/register', UserController.store)// rota de cadastro do usuario
router.post('/login', UserController.login)// rota de login do usuario

export { router }
