
import router from 'koa-joi-router'

import { pdf as ctrl } from '../controllers'

const publicRouter = router()

// 查詢 shop
publicRouter.route({
  method: 'post',
  path: '/pdf',
  validate: {
  },
  handler: ctrl.upload,
})

export default publicRouter
