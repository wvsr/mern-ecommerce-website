const express = require('express')
const router = express.Router()
const {
  getAllOrders,
  newOrder,
  changeOrderStatus,
  deleteOrder,
  getOrderById,
  getMyOrders,
} = require('../controller/orderController.js')

router.route('/').post(newOrder).delete(deleteOrder)

router.route('/all').get(getAllOrders)
router.put('change-status', changeOrderStatus)
router.get('/my-orders', getMyOrders)
router.get('/:id', getOrderById)

module.exports = router
