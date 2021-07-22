import { client } from '../prisma/client'
import { hash, compare } from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class UserController {
  async store (request: Request, response: Response) {
    const { email, password } = request.body

    const emailExists = await client.user.findFirst({ where: { email } })

    if (emailExists) {
      response.statusCode = 400
      response.json({
        error: 'Email já cadastrado!'
      })
      return
    } try {
      const passCrypt = await hash(password, 8)
      await client.user.create({
        data: {
          email,
          password: passCrypt
        }
      })
      response.statusCode = 201
      response.send('Conta criada com sucesso!')
    } catch (error) {
      response.statusCode = 400
      response.send('Deu bo')
    }
  }

  async login (request: Request, response: Response) {
    const { email, password } = request.body

    // verifica se o usuario existe
    const user = await client.user.findFirst({ where: { email } })
    if (!user) {
      response.statusCode = 400
      response.json({
        error: 'Email ou senha incorreta'
      })
      return
    } try {
      // verifica a senha
      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) {
        response.statusCode = 400
        response.json({
          error: 'Email ou senha incorreta'
        })
      }
      // gera JWT
      if (passwordMatch) {
        jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET,
          { expiresIn: '20s' }, (error, token) => {
            if (error) {
              response.statusCode = 400
              response.json({
                error: 'Erro ao autenticar!'
              })
              return false
            } else {
              response.statusCode = 200
              response.json({
                message: 'Sucesso!',
                token
              })
            }
          })
      } else {
        response.statusCode = 404
        response.json({
          msg: 'E-mail ou senha incorretos'
        })
      }
    } catch (error) {
      response.statusCode = 400
      response.send('Deu bo')
      console.log(error)
    }
  }
}
module.exports = new UserController()
