import { Request, Response } from 'express'
// import { client } from 'src/prisma/client'
import env from '@config/env'
import { verify } from 'jsonwebtoken'

class ProjectController {
  async createProject (request: Request, response: Response, token) {
    // const { projectName, projectDesc } = request.body

    const getUserEmail = verify(token, env.JWT_SECRET)

    console.log(getUserEmail.email)

    // const user = await client.user.findFirst({
    //   where: { email }
    // })
  }
}

module.exports = new ProjectController()
