import { Request, Response } from 'express'
import { AuthenticateGithubUseCase } from './authenticateGithubUseCase'

class AuthenticateGithubController {
  async handle (request: Request, response: Response) {
    const { GitHubUser } = request.body

    const authenticateGithubUseCase = new AuthenticateGithubUseCase()

    const token = authenticateGithubUseCase.login({
      GitHubUser
    })

    return { token }
  }
}

export { AuthenticateGithubController }
