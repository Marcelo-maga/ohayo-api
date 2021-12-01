import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { client } from '../prisma'

class AuthController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const userEmailExisits = await client.user.findFirst({ where: { email } })

    if (!userEmailExisits) {
      response.status(406)
      response.json({ msg: 'Email ou senha incorreta!' })
      return
    }

    const passwordMatch = await compare(password, userEmailExisits.password)

    if (!passwordMatch) {
      response.status(406)
      response.json({ msg: 'Email ou senha incorreta!' })
      return
    }

    const token = sign({ id: userEmailExisits.id, email: userEmailExisits.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    return response.json(token).status(200)
  }
}

export { AuthController }
