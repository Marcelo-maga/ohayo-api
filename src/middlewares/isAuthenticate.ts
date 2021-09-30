import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'

async function isAuthenticate (request: Request, response: Response, next: NextFunction) {
  const requestAuthToken = request.headers.authorization
  // verifica se chegou um token
  if (!requestAuthToken) {
    return response.status(401).json({
      message: 'Sem token!'
    })
  }
  const [, token] = requestAuthToken.split(' ')
  try {
    // verifica se o token é valido
    verify(token, env.JWT_SECRET)
    return next() // continua para a proxima função
  } catch (error) {
    console.log(error)
    return response.status(401).json({
      error: 'Token invalido'
    })
  }
}

export default isAuthenticate
