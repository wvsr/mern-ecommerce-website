const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./utills/conectDb.js')
const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())
app.use(cors())
connectDB()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
})

app.use('/api/user', require('./routes/UserRoutes.js'))
// app.use('/api/order', require('./routes/OrderRoute.js'))
app.use('/api/product', require('./routes/ProductRoute.js'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('app is running on port ' + PORT)
})
