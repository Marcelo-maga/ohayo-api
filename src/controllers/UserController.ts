import { client } from '../prisma/client'
import { hash } from 'bcrypt'
import { Request, Response } from 'express'

class UserController {
  async newUser (request: Request, response: Response) {
    const { email, password } = request.body

    const emailExists = client.user.findUnique({
      where: email
    })

    if (emailExists) {
      response.statusCode = 400
      response.json({
        error: 'Email já cadastrado!'
      })
    } try {
      const passwordHash = await hash(password, 8)
      const user = await client.user.create({
        data: {
          email,
          password: passwordHash
        }
      })
      return user
    } catch (error) {
      response.statusCode = 400
      response.json({
        error: 'Não conseguimos criar sua conta!'
      })
    }
  }
}

module.exports = new UserController()
