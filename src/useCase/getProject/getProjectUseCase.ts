import { client } from '../../prisma'

class GetProjectUseCase {
  async handle (projectId: string) {
    const response = await client.project.findUnique({
      where: {
        id: projectId
      }
    })

    return response
  }
}

export { GetProjectUseCase }
