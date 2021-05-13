import Router from 'koa-router'
const router = new Router()
const api = new Router()

import shop from './shop'
import pem from './pem'

api.use(shop)
api.use(pem)

router.use('/api', api.routes())

export default router
