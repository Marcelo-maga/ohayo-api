import { Request, Response } from 'express'
import { client } from '../prisma/client'
import jwtDecode from 'jwt-decode'

interface Types {
  email: string
  id: number
}
class ProjectController {
  async createProject (request: Request, response: Response) {
    const token = request.headers.authorization
    const { projectName, projectDesc } = request.body

    const decode = jwtDecode<Types>(token)

    const project = await client.project.findFirst({
      where: { userId: decode.id, name: projectName }
    })

    if (project) {
      response.statusCode = 400
      response.json({
        error: 'Projeto já criado!'
      })
      return
    }
    try {
      await client.user.update({
        where: { email: decode.email },
        data: {
          projects: {
            create: {
              name: projectName,
              desc: projectDesc
            }
          }
        }
      })
      response.statusCode = 201
      response.json({ message: 'Projeto criado com sucesso!' })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ProjectController()
