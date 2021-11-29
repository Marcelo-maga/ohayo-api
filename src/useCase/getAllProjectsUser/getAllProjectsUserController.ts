import { Request, Response } from 'express'
import { GetAllProjectsUserUseCase } from './getAllProjectsUserUseCase'

class GetAllProjectsUserController {
  async handle (request: Request, response: Response) {
    const jwtTokenUser = request.headers.authorization // Pega o token que vem com a requisição

    const getAllProjectsUserUseCase = new GetAllProjectsUserUseCase()

    const result = await getAllProjectsUserUseCase.handle(
      jwtTokenUser
    )

    return response.json(result)
  }
}

export { GetAllProjectsUserController }
