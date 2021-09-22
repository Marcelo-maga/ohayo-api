import { Request, Response } from 'express'
import { client } from '../prisma/client'
import jwtDecode from 'jwt-decode'

// Interface de tipos para ficar mais facil a declaração das informaçoes do decode
interface IJwtDecode {
  email: string
  id: number
}

class ProjectController {
  async createProject (request: Request, response: Response) {
    const jwtTokenUser = request.headers.authorization // Pega o token que vem com a requisição

    const {
      projectName: requestProjectName,
      projectDesc: requestProjectDesc
    } = request.body

    const jwtUserDecode = jwtDecode<IJwtDecode>(jwtTokenUser) // Decodifica o token e pega as informações

    const project = await client.project.findFirst({
      where: { userId: jwtUserDecode.id, name: requestProjectName }
    }) // faz uma busca na tabela de projetos, procurando um projeto com o mesmo nome, no mesmo usuario

    if (project) {
      response.statusCode = 400
      response.json({
        error: 'Projeto já criado!'
      })
      return
    } // caso o projeto exista, retorna erro
    try {
      await client.user.update({
        where: { email: jwtUserDecode.email },
        data: {
          projects: {
            create: {
              name: requestProjectName,
              desc: requestProjectDesc
            }
          }
        }
      })
      response.statusCode = 201
      response.json({ message: 'Projeto criado com sucesso!' })
    } catch (error) {
      console.log(error)
    }// Caso não, cria o projeto e caso ocorra algum erro, retorna
  }
}

module.exports = new ProjectController()
