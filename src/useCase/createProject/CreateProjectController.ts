import { Request, Response } from 'express'
import { CreateProjectUseCase } from './CreateProjectUseCase'

class CreateProjectController {
  async handle (request: Request, response: Response) {
    const jwtTokenUser = request.headers.authorization // Pega o token que vem com a requisição

    const { projectName, projectDesc } = request.body

    const createProjectUseCase = new CreateProjectUseCase()

    const result = await createProjectUseCase.handle(
      jwtTokenUser,
      projectName,
      projectDesc
    )

    return response.json(result)
  }
}

export { CreateProjectController }
