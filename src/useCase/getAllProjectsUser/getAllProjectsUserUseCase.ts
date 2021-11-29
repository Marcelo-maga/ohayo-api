import jwtDecode from 'jwt-decode'
import { client } from '../../prisma'

interface IJwtDecode {
  id: number,
  email: string
}

class GetAllProjectsUserUseCase {
  async handle (jwtTokenUser: string) {
    const jwtUserDecode = jwtDecode<IJwtDecode>(jwtTokenUser)

    const projects = await client.project.findMany({
      where: {
        userId: jwtUserDecode.id
      }
    })

    return projects
  }
}

export { GetAllProjectsUserUseCase }
