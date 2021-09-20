import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'

module.exports = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization
  // verifica se existe token
  if (!authToken) {
    return response.status(401).json({
      message: 'Sem token!'
    })
  }
  const [, token] = authToken.split(' ')
  try {
    // verifica se o token é valido
    verify(token, env.JWT_SECRET)
    return next(token) // continua para a proxima função
  } catch (error) {
    console.log(error)
    return response.status(401).json({
      error: 'Token invalido'
    })
  }
}
