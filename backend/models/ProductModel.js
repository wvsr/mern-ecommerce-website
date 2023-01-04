const mongoose = require('mongoose')

const rating = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  star: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  message: {
    type: String,
    required: true,
  },
})

const productModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    rating: [rating],
    active: {
      type: Boolean,
      required: true,
    },
    stockOut: {
      type: Boolean,
      required: false,
    },
    star: {
      type: Number,
      required: true,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
)

productModel.pre('save', function (next) {
  if (!this.isModified('rating')) {
    next()
  }
  const star =
    this.rating.reduce((sum, rating) => sum + rating.star, 0) /
    product.rating.lenght
})
module.exports = mongoose.model('Product', productModel)
