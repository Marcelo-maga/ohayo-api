import { Request, Response } from 'express'
import { GetProjectUseCase } from './getProjectUseCase'

class GetProjectController {
  async handle (request: Request, response: Response) {
    const params = request.params.id

    const getProjectUseCase = new GetProjectUseCase()

    const result = await getProjectUseCase.handle(params)

    return response.json(result)
  }
}

export { GetProjectController }
