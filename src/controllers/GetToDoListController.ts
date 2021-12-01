
import { Request, Response } from 'express'
import { client } from '../prisma'

class GetToDoController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id

    const result = await client.toDoList.findMany({
      where: {
        projectId: projectId
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

export { GetToDoController }
