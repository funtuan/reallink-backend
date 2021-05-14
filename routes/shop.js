
import router from 'koa-joi-router'
const Joi = router.Joi

import { shop as ctrl } from '../controllers'

const publicRouter = router()

// 建立 shop
publicRouter.route({
  method: 'post',
  path: '/shop',
  validate: {
    body: {
      name: Joi.string().max(20).required(),
      address: Joi.string().max(50).required(),
      contactName: Joi.string().max(10).required(),
      contactPhone: Joi.string().max(20).required(),
      contactEmail: Joi.string().max(200).required(),
    },
    type: 'json',
  },
  handler: ctrl.create,
})

// 查詢 shop
publicRouter.route({
  method: 'get',
  path: '/shop/:code',
  validate: {
  },
  handler: ctrl.findOne,
})

// 發送 shop 紀錄
publicRouter.route({
  method: 'post',
  path: '/shop/:code/record',
  validate: {
    body: {
      userId: Joi.string().max(50).required(),
      info: Joi.string().max(3000).required(),
      goAt: Joi.date().required(),
    },
    type: 'json',
  },
  handler: ctrl.record,
})

export default publicRouter


