
import { BadRequestError } from '../unit/errors'
import Shop from '../models/Shop'
import Record from '../models/Record'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

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

    const startDay = new Date(`${start} 00:00:00 +0800`)
    const endDay = new Date(+new Date(`${end} 00:00:00 +0800`) + 24 * 60 * 60 * 1000)

    ctx.assert(start <= end, new BadRequestError(`start must be less than end`))
    ctx.assert(endDay <= new Date(dayjs().tz('Asia/Taipei').format('YYYY-MM-DD 01:00:00 +0800')), new BadRequestError(`end cannot be greater than today`))
    ctx.assert(startDay > new Date(dayjs().tz('Asia/Taipei').add(-28, 'day').format('YYYY-MM-DD 00:00:00 +0800')), new BadRequestError(`start must be greater than 28 days ago`))

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
