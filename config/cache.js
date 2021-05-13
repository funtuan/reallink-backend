
module.exports = {
  middleware: {
    auth: {
      user: {
        CacheName: 'middleware:auth',
        Ttl: 5 * 60,
      },
    },
  },
}
