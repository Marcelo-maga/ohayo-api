import { Request, Response } from 'express'
import { client } from '../prisma'

class CompleteProjectController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id
    const { completeProject } = request.body

    const result = await client.project.update({
      where: { id: projectId },
      data: {
        complete: completeProject
      }
    })

    if (!result) {
      response.json({ msg: 'Erro' }).status(200)
      return
    }

    return response.json(result).status(200)
  }
}

export { CompleteProjectController }
