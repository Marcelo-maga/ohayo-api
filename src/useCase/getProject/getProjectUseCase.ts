import { client } from '../../prisma'

class GetProjectUseCase {
  async handle (projectId: string) {
    const response = await client.project.findUnique({
      where: {
        id: projectId
      }
    })

    console.log(response)

    return response
  }
}

export { GetProjectUseCase }
