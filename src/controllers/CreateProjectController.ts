import { Request, Response } from 'express'
import jwtDecode from 'jwt-decode'
import { client } from '../prisma'

interface IJwtDecode {
  id: number,
  email: string
}

class CreateProjectController {
  async handle (request: Request, response: Response) {
    const jwtTokenUser = request.headers.authorization // Pega o token que vem com a requisição

    const { projectName, projectDesc } = request.body

    const jwtUserDecode = jwtDecode<IJwtDecode>(jwtTokenUser) // Decodifica o token e pega as informações

    const project = await client.project.findFirst({
      where: { userId: jwtUserDecode.id, name: projectName }
    }) // faz uma busca na tabela de projetos, procurando um projeto com o mesmo nome, no mesmo usuario

    if (project) {
      response.status(406)
      response.json({ msg: 'Projeto Já Criado' })
      return
    }

    await client.user.update({
      where: {
        id: jwtUserDecode.id
      },
      data: {
        projects: {
          create: {
            name: projectName,
            desc: projectDesc,
            timeWorked: 0
          }
        }
      }
    })

    return response.json({ msg: 'Projeto criado com sucesso!' }).status(200)
  }
}

export { CreateProjectController }
