
import { Request, Response } from 'express'
import { client } from '../prisma'

class CreateToDoController {
  async handle (request: Request, response: Response) {
    const projectId = request.params.id

    const { itemName } = request.body

    const newItem = await client.project.update({
      where: { id: projectId },
      data: {
        toDoList: {
          create: {
            name: itemName,
            complete: false
          }
        }
      }
    })

    if (!newItem) {
      response.send(406)
      response.json({ msg: 'Erro ao criar' })
      return
    }

    return response.json(newItem).status(200)
  }
}

export { CreateToDoController }
