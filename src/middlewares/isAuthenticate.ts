import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

async function isAuthenticate (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.json({
      msg: 'token.invalid'
    }).status(406)
  }

  try {
    verify(authToken, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    return response.json({
      error: error.message
    }).status(406)
  }
}

export { isAuthenticate }
