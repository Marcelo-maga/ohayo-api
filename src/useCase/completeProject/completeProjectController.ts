import { Request, Response } from 'express'
import { CompleteProjectUseCase } from './completeProjectUseCase'

class CompleteProjectController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id
    const { completeProject } = request.body

    const editProjectUseCase = new CompleteProjectUseCase()

    const result = await editProjectUseCase.handle(
      projectId,
      completeProject
    )

    return response.json(result)
  }
}

export { CompleteProjectController }
