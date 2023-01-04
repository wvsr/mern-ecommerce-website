const express = require('express')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./utills/conectDb.js')
const app = express()
const PORT = process.env.PORT || 5000

connectDB()
dotenv.config()
app.use(express.json())
connectDB()

app.use('/api/user', require('./routes/UserRoutes.js'))
// app.use('api/order', require('./routes/OrderRoute.js'))
// app.use('api/product', require('./routes/ProductRoute.js'))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('app is running on port ' + PORT)
})
