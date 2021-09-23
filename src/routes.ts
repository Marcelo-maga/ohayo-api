import { Router } from 'express'

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const isAuthenticate = require('./middlewares/isAuthenticate')

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')// rota de teste
})

router.post('/register', UserController.store)// rota de cadastro do usuario
router.post('/login', UserController.login)// rota de login do usuario

router.post('/newProject', isAuthenticate, ProjectController.createProject)// Rota de criação de projeto

export { router }
