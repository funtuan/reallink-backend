
import router from 'koa-joi-router'
const Joi = router.Joi

import { dashbroad as ctrl } from '../controllers'

const publicRouter = router()

// 查詢期間數據
publicRouter.route({
  method: 'get',
  path: '/dashbroad/total',
  validate: {
    query: {
      code: Joi.string().required(),
      secret: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
    },
    output: {
      200: {
        body: {
          count: Joi.number(),
        },
      },
    },
  },
  handler: ctrl.showDayData,
})

// 查詢今天最後五則訊息
publicRouter.route({
  method: 'get',
  path: '/dashbroad/today',
  validate: {
    query: {
      code: Joi.string().required(),
      secret: Joi.string().required(),
    },
    output: {
      200: {
        body: Joi.array(),
      },
    },
  },
  handler: ctrl.showTodayRecord,
})


export default publicRouter
