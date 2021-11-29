import { Request, Response, NextFunction } from 'express'

async function catchErros (error: Error, request: Request, response: Response, next: NextFunction) {
  if (error) {
    return (
      response.json({
        status: 'Error',
        message: error.message
      }).statusCode = 401
    )
  }
  next()
}

export default catchErros
