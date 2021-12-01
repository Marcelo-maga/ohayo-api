import { Router } from 'express'

import { isAuthenticate } from './middlewares/isAuthenticate'

import { CreateUserController } from './controllers/CreateUserController'
import { AuthController } from './controllers/AuthController'
import { CreateProjectController } from './controllers/CreateProjectController'
import { GetAllProjectsUserController } from './controllers/GetAllProjectsUserController'
import { GetProjectController } from './controllers/GetProjectController'
import { NewTimeWorkedController } from './controllers/NewTimeWorkedController'
import { CompleteProjectController } from './controllers/CompleteProjectController'
import { CreateToDoController } from './controllers/CreateToDoController'
import { GetToDoController } from './controllers/GetToDoListController'
import { CompleteToDoController } from './controllers/CompleteToDoController'

// controllers
const createUserController = new CreateUserController()
const authUserController = new AuthController()

const createProject = new CreateProjectController()
const getAllProjects = new GetAllProjectsUserController()
const getProject = new GetProjectController()
const hourCounter = new NewTimeWorkedController()
const completeProject = new CompleteProjectController()
const createToDo = new CreateToDoController()
const getToDo = new GetToDoController()
const completeToDo = new CompleteToDoController()

const router = Router()

router.get('/', (request, response) => {
  response.send('Oi, você vem sempre aqui?')// rota de teste
})

router.post('/register', createUserController.handle)// rota de cadastro do usuario
router.post('/login', authUserController.handle)// rota de login do usuario

router.post('/newProject', isAuthenticate, createProject.handle)// Rota de criação de projeto
router.get('/getAllProjects', isAuthenticate, getAllProjects.handle)
router.get('/getProject/:id', isAuthenticate, getProject.handle)
router.post('/newTotalHours', isAuthenticate, hourCounter.handle)
router.post('/completeProject/:id', isAuthenticate, completeProject.handle)
router.post('/newToDoIten/:id', isAuthenticate, createToDo.handle)
router.get('/getToDo/:id', isAuthenticate, getToDo.handle)
router.post('/completeToDo/:id', isAuthenticate, completeToDo.handle)

export { router }
