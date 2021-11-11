import { compare } from 'bcryptjs'
import { client } from '../../prisma'
import { sign } from 'jsonwebtoken'
import env from '../../config/env'

interface IUserRequest {
  email: string,
  password: string
}

class AuthenticateUserUseCase {
  async login ({ email, password }: IUserRequest) {
    const userEmailExisits = await client.user.findFirst({ where: { email } })
    // Verifica se o email existe
    if (!userEmailExisits) {
      throw new Error('Email ou senha incorreta!')
    }
    // Verifica se a senha está correta
    const passwordMatch = await compare(password, userEmailExisits.password)

    if (!passwordMatch) {
      throw new Error('Email ou senha incorreta!')
    }
    // Gera o token
    const token = sign({ id: userEmailExisits.id, email: userEmailExisits.email }, env.JWT_SECRET, {
      expiresIn: '24h'
    })
    return { token }
  }
}

export { AuthenticateUserUseCase }
