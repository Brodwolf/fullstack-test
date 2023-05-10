import * as flatted from 'flatted'
import DebuggerPolicy from './DebuggerPolicy'
import { Request, Response, NextFunction } from 'express'
import { createLogger, transports, format } from 'winston'

/**
 * Middleware de logger
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export async function loggerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  if ((DebuggerPolicy()) >= 1) {
    let log = `[${req.method}] - [${req.originalUrl}] - [From: ${req.ip}]`

    if (Object.keys(req.body).length > 0 && req.originalUrl !== '/api/report/metadata') {
      log += ` - [Body: ${JSON.stringify(req.body)}]`
    }

    if (req.originalUrl === '/api/report/metadata') {
      log += ` - [Body: Base64]`
    }

    if (Object.keys(req.query).length > 0) {
      log += ` - [Query: ${JSON.stringify(req.query)}]`
    }

    if ((DebuggerPolicy()) == 2) {
      logger.info(log, flatted.toJSON(req))
    } else {
      logger.info(log)
    }
  }
  next()
}

/**
 * Cria um log
 * 
 * @param process
 */
export const createLog = (process: any) => {
  if ((DebuggerPolicy()) === 1) {
    logger.info(process)
  }
}

/**
 * Cria um Log de Erro
 * 
 * @param process
 * @param message
 * @param error 
 */
export const createErrorLog = (process: any, message: any, stack?: any) => {
  logger.error(`${process}: ${message}`, flatted.toJSON(stack))
}

/**
 * Retorna a configuração de timezone
 * 
 * @returns {Date}
 */
const timezoned = () => {
  return new Date().toLocaleString()
}

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, metadata }) => {
          return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
            metadata
          )}`
        })
      ),
    }),
    new transports.File({
      dirname: process.env.LOG_FOLDER,
      filename: "application-log.log",
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(format.metadata(), format.timestamp({ format: timezoned }))
})