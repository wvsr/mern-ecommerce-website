const express = require('express')
const { authUser } = require('../middleware/authMiddleware.js')
const router = express.Router()
const {
  getAllOrders,
  newOrder,
  changeOrderStatus,
  deleteOrder,
  getOrderById,
  getMyOrders,
} = require('../controller/orderController.js')

router.route('/').post(authUser, newOrder).delete(deleteOrder)

router.route('/all').get(getAllOrders)
router.put('change-status', changeOrderStatus)
router.get('/my-orders', getMyOrders)
router.get('/:id', getOrderById)

module.exports = router
