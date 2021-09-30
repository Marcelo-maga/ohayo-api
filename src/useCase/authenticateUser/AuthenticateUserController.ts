import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const token = await authenticateUserUseCase.login({
      email,
      password
    })

    return response.json(token)
  }
}

export { AuthenticateUserController }
