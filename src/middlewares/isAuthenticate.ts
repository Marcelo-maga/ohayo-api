import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'

interface tokenType {
  token: string
}

async function isAuthenticate (request: Request, response: Response, next: NextFunction) {
  const requestAuthToken = request.headers.authorization

  const decodeToken: tokenType = JSON.parse(requestAuthToken)

  // verifica se chegou um token
  if (!decodeToken) {
    return response.status(401).json({
      message: 'Sem token!'
    })
  }

  try {
    // verifica se o token é valido
    verify(decodeToken.token, env.JWT_SECRET)
    return next() // continua para a proxima função
  } catch (error) {
    console.log(error)
    return response.status(401).json({
      error: 'Token invalido'
    })
  }
}

export default isAuthenticate
