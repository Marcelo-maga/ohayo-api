import { Router } from 'express'

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const authenticate = require('./middlewares/authenticate')

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')// rota de teste
})

router.post('/register', UserController.store)// rota de cadastro do usuario
router.post('/login', UserController.login)// rota de login do usuario

router.post('/newProject', authenticate, ProjectController.createProject)// Rota de criação de projeto

export { router }
