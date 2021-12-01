import { Request, Response } from 'express'
import { client } from '../prisma'

class NewTimeWorkedController {
  async handle (request: Request, response: Response) {
    const { projectId, newTimeWorked } = request.body

    const updateTimeTotal = await client.project.update({
      where: {
        id: projectId
      },
      data: {
        timeWorked: { increment: newTimeWorked }
      }
    })

    if (!updateTimeTotal) {
      response.status(406)
      response.json({ msg: 'Projeto não encontrado' })
      return
    }

    return response.json({ msg: 'Sucesso' }).status(200)
  }
}

export { NewTimeWorkedController }
