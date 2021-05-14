
import { BadRequestError } from '../unit/errors'
import Shop from '../models/Shop'
import Record from '../models/Record'

import NodeCache from 'node-cache'
const nodeCache = new NodeCache()

import _ from 'lodash'
import { customAlphabet } from 'nanoid'
const nanoid8 = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 8)
const nanoid20 = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 20)

export default {
  async create(ctx) {
    const {
      name,
      address,
      contactName,
      contactPhone,
      contactEmail,
    } = ctx.request.body

    const code = nanoid8()
    const secret = nanoid20()

    const shop = new Shop({
      code,
      name,
      address,
      contactName,
      contactPhone,
      contactEmail,
      secret,
    })
    await shop.save()

    ctx.body = shop
  },

  async findOne(ctx) {
    const {
      code,
    } = ctx.request.params

    const key = `shop:${code}`

    ctx.assert(code, new BadRequestError(`code not found`))
    let body = nodeCache.get(key)

    if (!body) {
      const shop = await Shop.findOne({
        code,
      })
      ctx.assert(shop, new BadRequestError(`shop not found`))
      body = _.pick(shop, [
        'code',
        'name',
        'address',
      ])
      nodeCache.set(key, body)
    }

    ctx.body = body
  },

  async record(ctx) {
    const {
      code,
    } = ctx.request.params
    const {
      info,
      goAt,
    } = ctx.request.body

    ctx.assert(code, new BadRequestError(`code not found`))
    const shop = await Shop.findOne({
      code,
    })
    ctx.assert(shop, new BadRequestError(`shop not found`))

    const record = new Record({
      info,
      goAt,
      shop: shop.id,
    })
    record.save()

    ctx.body = _.pick(record, [
      'info',
      'goAt',
    ])
  },
}
