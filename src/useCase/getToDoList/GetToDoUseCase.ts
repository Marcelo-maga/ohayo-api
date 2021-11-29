
import { client } from '../../prisma'

class GetToDoUseCase {
  async handle (projectId: string) {
    const toDoList = await client.toDoList.findMany({
      where: {
        projectId: projectId
      }
    })

    return toDoList
  }
}

export { GetToDoUseCase }
