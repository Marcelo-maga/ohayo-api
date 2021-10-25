import jwtDecode from 'jwt-decode'
import { client } from '../../prisma'

interface IJwtDecode {
  email: string
  id: number
}

class CreateProjectUseCase {
  async handle (jwtTokenUser: string, projectName: string, projectDesc: string) {
    const jwtUserDecode = jwtDecode<IJwtDecode>(jwtTokenUser) // Decodifica o token e pega as informações

    const project = await client.project.findFirst({
      where: { userId: jwtUserDecode.id, name: projectName }
    }) // faz uma busca na tabela de projetos, procurando um projeto com o mesmo nome, no mesmo usuario

    if (project) {
      throw new Error('Projeto Já Criado')
    }

    const newProject = await client.project.create({
      data: {
        name: projectName,
        desc: projectDesc,
        userId: jwtUserDecode.id
      }
    })

    return newProject
  }
}

export { CreateProjectUseCase }
