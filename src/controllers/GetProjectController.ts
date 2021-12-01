import { Request, Response } from 'express'
import { client } from '../prisma'

class GetProjectController {
  async handle (request: Request, response: Response) {
    const projectID = request.params.id

    const result = await client.project.findUnique({
      where: {
        id: projectID
      }
    })

    if (!result) {
      response.status(406)
      response.json({ msg: 'Projeto não encontrado' })
      return
    }

    return response.json(result).status(200)
  }
}

export { GetProjectController }
