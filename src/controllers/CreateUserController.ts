import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { client } from 'src/prisma'

class CreateUserController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const userEmailExisits = await client.user.findFirst({ where: { email: email } })

    if (userEmailExisits) {
      response.status(406)
      response.json({ msg: 'Usuario já existe' })
      return
    }

    const passwordCrypt = await hash(password, 8) // cripitografia da senha

    // criação do usuario e perfil no banco de dados
    await client.user.create({
      data: {
        email,
        password: passwordCrypt
      }
    }).then(() => {
      return response.json({ msg: 'Usuario criado com sucesso' }).status(200)
    })
  }
}

export { CreateUserController }
