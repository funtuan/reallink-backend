const { ValidationError } = require('yup')
const http = require('http')

class BadRequestError extends Error {
  constructor(message = http.STATUS_CODES[400]) {
    super(message)
    this.message = message
    this.statusCode = 400

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthenticationError extends Error {
  constructor(message = http.STATUS_CODES[401]) {
    super(message)
    this.message = message
    this.statusCode = 401

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class ForbiddenError extends Error {
  constructor(message = http.STATUS_CODES[403]) {
    super(message)
    this.message = message
    this.statusCode = 403

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class NotFoundError extends Error {
  constructor(message = http.STATUS_CODES[404]) {
    super(message)
    this.message = message
    this.statusCode = 404

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class ServerError extends Error {
  constructor(message = http.STATUS_CODES[500]) {
    super(message)
    this.message = message
    this.statusCode = 500

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  BadRequestError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  ServerError,
}
