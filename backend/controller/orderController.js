const Order = require('../models/orederModel.js')
const Product = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

// @Route POST api/order/new
// @Desc Creating new Order
// @Access Private

const newOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingLocation } = req.body

  const prices = orderItems.map((item) => {
    const product = Product.findByID(item)
    if (product) {
      return product.price
    }
    throw new Error('Invalid product ID')
  })

  const totalPrice = prices.reduce((acc, item) => {
    return acc + item
  }, 0)

  const order = await Order.create({
    orderItems,
    shippingLocation,
    userId: req.user.id,
    totalPrice,
  })

  if (order) {
    res.status(201).json({
      message: 'Order created successfully',
    })
  }

  res.status(400)
  throw new Error('server error')
})

// @Route GET api/order/all
// @Desc  Get all orders
// @Access Private, Admin only

const getAllOrders = asyncHandler(async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 20,
  }
  const orders = await Order.find({})
    .select('-shippingLocation')
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({ createdAt: -1 })

  if (orders) {
    res.status(200).json(orders)
  }

  res.status(404)
  throw new Error('No orders found')
})

// @Route GET api/order/:id
// @Desc Get order by ID
// @Access Private, Admin only

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.status(200).json(order)
  }

  res.status(404)
  throw new Error('Order not found')
})

// @Route GET api/order/
// @Desc Get my orders
// @Access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })

  if (orders) {
    res.status(200).json(orders)
  }
  res.status(404)
  throw new Error('No orders found')
})

// @Route DELETE api/order/:id
// @Desc Delete order by ID
// @Access Private, Admin only

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const autorizeUser = order.userId === req.user._id || req.user.isAdmin
  if (order && autorizeUser) {
    order.remove()
    res.status(202)
    res.json({ message: 'order removed successfully' })
  }
  if (!autorizeUser) {
    res.status(401)
    throw new Error('Unauthorized user')
  }

  res.status(404)
  throw new Error('Order not found')
})

// @Route PUT api/order/change-status/:id/:status
// @Desc Change order status
// @Access Private, Admin only

const changeOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const { status } = req.params
  if (order) {
    switch (status) {
      case 'pending':
        order.status = 'pending'
        break
      case 'shipping':
        order.status = 'shipping'
        break
      case 'delivered':
        order.status = 'delivered'
        break
      case 'canceled':
        order.status = 'canceled'
        break
      default:
        throw new Error('Unknown status: ' + order.status)
    }
    order.save()
    res.status(202)
    res.json({ message: 'order status changed successfully' })
  }

  res.status(404)
  throw new Error('Order not found')
})
module.exports = {
  newOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  deleteOrder,
  changeOrderStatus,
}
