import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'

interface IToken {
  token: string
}

async function isAuthenticate (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  const token: IToken = JSON.parse(authToken)

  if (!token) {
    return response.status(401).json({
      errorCode: 'token.invalid'
    })
  }

  // const [, token] = authToken.split(' ')

  try {
    verify(token.token, env.JWT_SECRET)
    return next()
  } catch (err) {
    return response.status(401).json({
      error: err.message
    })
  }
}

export { isAuthenticate }
