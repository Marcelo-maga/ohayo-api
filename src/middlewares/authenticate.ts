import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

module.exports = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization
  if (!authToken) {
    return response.status(401).json({
      message: 'Sem token!'
    })
  }
  const [, token] = authToken.split(' ')
  try {
    verify(token, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    return response.status(401).json({
      error: 'Token invalido'
    })
  }
}
