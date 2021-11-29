
import { client } from '../../prisma'

class CreateToDoUseCase {
  async handle (projectId: string, itemName: string) {
    const newItem = await client.project.update({
      where: { id: projectId },
      data: {
        toDoList: {
          create: {
            name: itemName,
            complete: false
          }
        }
      }
    })
    return newItem
  }
}

export { CreateToDoUseCase }
