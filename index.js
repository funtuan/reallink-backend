require('@babel/register')
require('@babel/polyfill')
require('dotenv').config()

exports = module.exports = require('./server')
