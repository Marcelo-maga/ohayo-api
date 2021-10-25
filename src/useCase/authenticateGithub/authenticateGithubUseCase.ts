import { client } from '../../prisma'

interface IUserRequest {
  GitHubUser: any
}

class AuthenticateGithubUseCase {
  async login ({ GitHubUser }: IUserRequest) {
    const userEmailExisits = await client.user.findUnique({ where: { email: GitHubUser.email } })

    if (userEmailExisits) {
      return
    }

    if (!userEmailExisits) {
      const newGithubUser = await client.user.create({
        data: {
          email: GitHubUser.email,
          acessTokenGH: GitHubUser.stsTokenManager.accessToken,
          profile: {
            create: {
              name: GitHubUser.displayName,
              photo: GitHubUser.photoURL
            }
          }
        }
      })

      return { newGithubUser }
    }
  }
}

export { AuthenticateGithubUseCase }
