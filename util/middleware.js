const jwt = require('jsonwebtoken')

const logger = require('./logger')
const { SECRET } = require('../util/config')
const { Blog, Session, User } = require('../models')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: error.message })
  }
  logger.error(error.message)
  next(error)
}

const blogFindById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) return res.status(401).json({ error: 'blog not found' })
  next()
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)

      const session = await Session.findOne({ where: { token: token } })
      if (!session) {
        return res
          .status(401)
          .json({ error: 'session not valid, token probably expired' })
      }

      //disabling user, revokes rights immediately
      const user = await User.findByPk(session.userId)
      if (user.disabled) {
        return res
          .status(401)
          .json({ error: 'account disabled, please contact admin' })
      }

      req.decodedToken = jwt.verify(token, SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  blogFindById,
  tokenExtractor
}

