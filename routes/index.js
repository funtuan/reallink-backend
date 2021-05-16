import Router from 'koa-router'
const router = new Router()
const api = new Router()

import shop from './shop'
import pem from './pem'
import pdf from './pdf'
import dashbroad from './dashbroad'

api.use(shop)
api.use(pem)
api.use(pdf)
api.use(dashbroad)

router.use('/api', api.routes())

export default router
