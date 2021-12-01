import { Request, Response } from 'express'
import jwtDecode from 'jwt-decode'
import { client } from '../prisma'

interface IJwtDecode {
  id: number,
  email: string
}

class GetAllProjectsUserController {
  async handle (request: Request, response: Response) {
    const jwtTokenUser = request.headers.authorization // Pega o token que vem com a requisição
    const jwtUserDecode = jwtDecode<IJwtDecode>(jwtTokenUser)

    const projects = await client.project.findMany({
      where: {
        userId: jwtUserDecode.id
      }
    })

    return response.json(projects).status(200)
  }
}

export { GetAllProjectsUserController }
