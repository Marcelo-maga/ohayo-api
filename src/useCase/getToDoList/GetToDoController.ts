
import { Request, Response } from 'express'
import { GetToDoUseCase } from './GetToDoUseCase'

class GetToDoController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id

    const getToDoUseCase = new GetToDoUseCase()

    const result = await getToDoUseCase.handle(
      projectId
    )

    return response.json(result)
  }
}

export { GetToDoController }
