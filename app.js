import Koa from 'koa'

const app = new Koa()

// 計算請求響應時間，設置於 header X-Response-Time
import responseTime from 'koa-response-time'
app.use(responseTime())

import logger from 'koa-logger'
app.use(logger())

import xRequestId from 'koa-x-request-id'
app.use(xRequestId({ inject: true }, app))

import error from './middleware/error'
app.use(error)

import jwt from './middleware/jwt'
app.use(jwt)

import cors from './middleware/cors'
app.use(
    cors({
      origin: '*',
      exposeHeaders: ['Authorization'],
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Authorization', 'Content-Type', 'Accept'],
      keepHeadersOnError: true,
    }),
)

import koaBody from 'koa-body'
app.use(koaBody({ multipart: true }))


import routes from './routes'
app.use(routes.routes())
app.use(routes.allowedMethods())

export default app
