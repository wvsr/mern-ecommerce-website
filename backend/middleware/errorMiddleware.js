const notFound = (req, res, next) => {
  const error = new Error(`Page(${req.originalUrl}) not Found`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.errorMessage,
    stack: process.env.NODE_ENV == 'PRODUCTION' ? null : err.stack,
  })
}

module.exports = { errorHandler, notFound }
