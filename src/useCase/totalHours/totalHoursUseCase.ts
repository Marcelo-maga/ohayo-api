import { client } from '../../prisma/'

class TotalHourUseCase {
  async handle (projectId: string, newTimeWorked: number) {
    const updateTimeTotal = await client.project.update({
      where: {
        id: projectId
      },
      data: {
        timeWorked: { increment: newTimeWorked }
      }
    })

    return updateTimeTotal
  }
}

export { TotalHourUseCase }
