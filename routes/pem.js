
import router from 'koa-joi-router'

import { pem as ctrl } from '../controllers'

const publicRouter = router()

// 查詢 shop
publicRouter.route({
  method: 'get',
  path: '/pem',
  validate: {
  },
  handler: ctrl.find,
})

export default publicRouter
