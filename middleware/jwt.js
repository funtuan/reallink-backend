const koaJwt = require('koa-jwt')
const { secret } = require('../config/server')
console.log('secret', secret)

module.exports = koaJwt({
  getToken(ctx, opts) {
    const { authorization } = ctx.header

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1]
    }

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1]
    }

    return null
  },
  secret,
  passthrough: true,
  key: 'jwt',
})
