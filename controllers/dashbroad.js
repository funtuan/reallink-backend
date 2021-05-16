
import { BadRequestError } from '../unit/errors'
import Shop from '../models/Shop'
import Record from '../models/Record'

import dayjs from 'dayjs'
import NodeCache from 'node-cache'
const nodeCache = new NodeCache()

import _ from 'lodash'

export default {
  async showDayData(ctx) {
    const {
      code,
      secret,
      start,
      end,
    } = ctx.request.query

    const startDay = new Date(dayjs(start).format('YYYY-MM-DD 00:00:00 +0800'))
    const endDay = new Date(dayjs(end).add(1, 'day').format('YYYY-MM-DD 00:00:00 +0800'))

    ctx.assert(start <= end, new BadRequestError(`start must be less than end`))
    ctx.assert(endDay < new Date(dayjs().add(1, 'day').format('YYYY-MM-DD 00:00:00 +0800')), new BadRequestError(`end cannot be greater than today`))
    ctx.assert(startDay > new Date(dayjs().add(-28, 'day').format('YYYY-MM-DD 00:00:00 +0800')), new BadRequestError(`start must be greater than 28 days ago`))

    const key = `dashbroad:showDayData:${code}:${secret}:${+startDay}:${+endDay}`

    const cacheData = nodeCache.get(key)
    if (cacheData) {
      ctx.body = cacheData
      return
    }

    const shop = await Shop.findOne({
      code,
      secret,
    })
    ctx.assert(shop, new BadRequestError(`shop not found`))

    const count = await Record.count({
      shop: shop._id,
      goAt: { $gte: startDay, $lt: endDay },
    })

    const body = {
      count,
    }
    nodeCache.set(key, body)

    ctx.body = body
  },

  async showTodayRecord(ctx) {
    const {
      code,
      secret,
    } = ctx.request.query

    const shop = await Shop.findOne({
      code,
      secret,
    })
    ctx.assert(shop, new BadRequestError(`shop not found`))

    const records = await Record.find({
      shop: shop._id,
      createdAt: {
        $gte: new Date(dayjs().format('YYYY-MM-DD 00:00:00 +0800')),
      },
    }).sort({
      'createdAt': -1,
    }).limit(5)

    ctx.body = records.map((one) => _.pick(one, [
      'createdAt',
    ]))
  },
}
