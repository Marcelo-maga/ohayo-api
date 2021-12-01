import { Request, Response } from 'express'
import { client } from '../prisma'

class CompleteToDoController {
  async handle (request: Request, response: Response) {
    const { toDoId } = request.body

    const result = await client.toDoList.delete({
      where: {
        id: toDoId
      }
    })

    if (!result) {
      response.status(401)
      response.json({ msg: 'Erro' })
      return
    }

    return response.json({ msg: 'Deletado com sucesso' }).status(200)
  }
}

export { CompleteToDoController }
