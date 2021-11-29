import { client } from '../../prisma'

class CompleteProjectUseCase {
  async handle (projectId: string, completeProject: boolean) {
    const response = await client.project.update({
      where: { id: projectId },
      data: {
        complete: completeProject
      }
    })
    return response
  }
}

export { CompleteProjectUseCase }
