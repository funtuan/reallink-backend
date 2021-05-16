
module.exports = {
  secret: process.env.SECRET || '69ec3a876fa124fcaafc4539663bf',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  frontendHost: process.env.FRONTEND_HOST || 'http://localhost:8080',
  corsOrigin: process.env.CORS_ORIGIN || '*',
}
