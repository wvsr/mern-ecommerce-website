const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'shipping', 'delivered', 'cancelled'],
  },
  shippingLocation: {
    type: String,
    required: true,
  },
})

const order = mongoose.model('Order', orderSchema)

module.exports = order
