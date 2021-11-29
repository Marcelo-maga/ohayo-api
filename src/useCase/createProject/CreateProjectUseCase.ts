
import jwtDecode from 'jwt-decode'
import { client } from '../../prisma'

interface IJwtDecode {
  id: number,
  email: string
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

    const newProject = await client.user.update({
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

    return newProject
  }
}

export { CreateProjectUseCase }
