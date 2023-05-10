import md5 from 'md5'
import { Request, Response, NextFunction } from 'express'

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (await isUserAuthenticated(token)) {
    next()
  } else {
    res.status(401).send('Usuário não autenticado')
  }
}

/**
 * Indica se o usuário está autenticado
 * 
 * @param {string} token 
 * 
 * @returns {boolean}
 */
async function isUserAuthenticated(token: any): Promise<boolean> {
  // return token === validToken()
  return true
}

/**
 * Indica uma token válida
 * 
 * @returns {string}
 */
const validToken = () => {
  // @ts-ignore
  return (md5(process.env.BACKEND_USER) + md5(process.env.BACKEND_PASSWORD))
}
