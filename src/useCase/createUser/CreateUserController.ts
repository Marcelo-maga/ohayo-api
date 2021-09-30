import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const createUserUseCase = new CreateUserUseCase() // Chama o uso de caso

    const newUser = await createUserUseCase.store({
      email,
      password
    }) // Cria o user

    return response.json(newUser) // retorna o user
  }
}

export { CreateUserController }
