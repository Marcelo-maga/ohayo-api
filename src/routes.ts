import { Router } from 'express'

import isAuthenticate from './middlewares/isAuthenticate'

import { AuthenticateGithubController } from './useCase/authenticateGithub/authenticateGithubController'
import { AuthenticateUserController } from './useCase/authenticateUser/AuthenticateUserController'
import { CreateProjectController } from './useCase/createProject/CreateProjectController'
import { CreateUserController } from './useCase/createUser/CreateUserController'

// controllers
const createUserController = new CreateUserController()
const authUserController = new AuthenticateUserController()
const authGithub = new AuthenticateGithubController()
const createProject = new CreateProjectController()

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')// rota de teste
})

router.post('/register', createUserController.handle)// rota de cadastro do usuario
router.post('/login', authUserController.handle)// rota de login do usuario
router.post('/githubAuth', authGithub.handle)// rota de login com github

router.post('/newProject', isAuthenticate, createProject.handle)// Rota de criação de projeto

export default router
