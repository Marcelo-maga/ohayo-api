import { Router } from 'express'

import { isAuthenticate } from './middlewares/isAuthenticate'

import { AuthenticateUserController } from './useCase/authenticateUser/AuthenticateUserController'
import { CreateProjectController } from './useCase/createProject/CreateProjectController'
import { CreateUserController } from './useCase/createUser/CreateUserController'
import { CompleteProjectController } from './useCase/completeProject/completeProjectController'
import { GetAllProjectsUserController } from './useCase/getAllProjectsUser/getAllProjectsUserController'
import { GetProjectController } from './useCase/getProject/getProjectController'
import { TotalHourController } from './useCase/totalHours/totalHoursController'
import { CreateToDoController } from './useCase/createToDo/CreateToDoController'
import { GetToDoController } from './useCase/getToDoList/GetToDoController'

// controllers
const createUserController = new CreateUserController()
const authUserController = new AuthenticateUserController()
const createProject = new CreateProjectController()
const getAllProjects = new GetAllProjectsUserController()
const getProject = new GetProjectController()
const hourCounter = new TotalHourController()
const editProject = new CompleteProjectController()
const createToDo = new CreateToDoController()
const getToDo = new GetToDoController()

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
router.post('/completeProject/:id', isAuthenticate, editProject.handle)
router.post('/newToDoIten/:id', isAuthenticate, createToDo.handle)
router.get('/getToDo/:id', isAuthenticate, getToDo.handle)

export default router
