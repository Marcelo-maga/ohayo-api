import { client } from '../prisma/client'
import { hash, compare } from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'

class UserController {
  async store (request: Request, response: Response) {
    const {
      email,
      password
    } = request.body

    const userEmailExisits = await client.user.findFirst({ where: { email } })

    // verifica se o email já foi cadastrado
    if (userEmailExisits) {
      response.statusCode = 400
      response.json({
        error: 'Email já cadastrado!'
      })
      return
    } try {
      const passwordCrypt = await hash(password, 8) // cripitografia da senha
      // criação do usuario e perfil no banco de dados
      await client.user.create({
        data: {
          email,
          password: passwordCrypt,
          profile: {
            create: {
              name: null,
              bio: null
            }
          }
        }
      })
      response.statusCode = 201
      response.json({ message: 'Conta criada com sucesso!' })
    } catch (error) {
      response.statusCode = 400
      response.json({ error: 'Seu Usuario não pode ser criado!' })
    }
  }

  async login (request: Request, response: Response) {
    const {
      email,
      password
    } = request.body

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
        jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET,
          { expiresIn: '24h' }, (error, token) => {
            if (error) {
              response.statusCode = 400
              response.json({
                error: 'Erro ao autenticar!'
              })
              return false
            } else {
              response.statusCode = 200
              response.json({
                token
              })
            }
          })
      } else {
        response.statusCode = 404
        response.json({
          msg: 'Email ou senha incorreta'
        })
      }
    } catch (error) {
      response.statusCode = 400
      response.send('Deu bo')
      console.log(error)
    }
  }

  async githubAuth (request: Request, response: Response) {
    const { GitHubUser } = request.body

    console.log(GitHubUser)
    const userEmailExisits = await client.user.findUnique({ where: { email: GitHubUser.email } })

    if (userEmailExisits) {
      response.statusCode = 200
      response.json({
        message: 'Sucesso'
      })
    }
    try {
      await client.user.create({
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
    } catch (error) {

    }
  }
}
module.exports = new UserController()
