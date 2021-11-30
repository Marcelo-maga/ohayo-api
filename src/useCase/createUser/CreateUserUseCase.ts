import { client } from '../../prisma'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IUserRequest {
  email: string,
  password: string
}

class CreateUserUseCase {
  async store ({ email, password }: IUserRequest) {
    // Verifica se o email já foi cadastrado na plataforma
    const userEmailExisits = await client.user.findFirst({ where: { email: email } })

    if (userEmailExisits) {
      throw new Error('Usuario já existe')
    }

    const passwordCrypt = await hash(password, 8) // cripitografia da senha
    // criação do usuario e perfil no banco de dados
    const userCreate = await client.user.create({
      data: {
        email,
        password: passwordCrypt
      }
    })

    const token = sign({ id: userEmailExisits.id, email: userEmailExisits.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    return { userCreate, token }
  }
}

export { CreateUserUseCase }
