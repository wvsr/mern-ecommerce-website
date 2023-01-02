const mongoose = require('mongoose')

const rating = mongoose.Schema({
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
    image: {
      type: String,
      required: true,
    },
    rating: [rating],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productModel)
