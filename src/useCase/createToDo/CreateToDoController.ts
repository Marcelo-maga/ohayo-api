
import { Request, Response } from 'express'
import { CreateToDoUseCase } from './CreateToDoUseCase'

class CreateToDoController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id

    const { itemName } = request.body

    const createToDoUseCase = new CreateToDoUseCase()

    const result = await createToDoUseCase.handle(
      projectId,
      itemName
    )

    return response.json(result)
  }
}

export { CreateToDoController }
