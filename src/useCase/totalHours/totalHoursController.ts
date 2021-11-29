import { Request, Response } from 'express'
import { TotalHourUseCase } from './totalHoursUseCase'

class TotalHourController {
  async handle (request: Request, response: Response) {
    const { projectId, newTimeWorked } = request.body

    const totalHourUseCase = new TotalHourUseCase()

    const result = await totalHourUseCase.handle(
      projectId,
      newTimeWorked
    )

    return response.json(result)
  }
}

export { TotalHourController }
