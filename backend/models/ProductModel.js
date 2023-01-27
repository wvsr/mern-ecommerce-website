const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

const productModel = new mongoose.Schema(
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
    rating: [ratingSchema],
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

// productModel.pre('save', function (next) {
//   if (!this.isModified('rating')) {
//     next()
//   }
//   const star =
//     this.rating.reduce((sum, rating) => sum + rating.star, 0) /
//     this.rating.lenght
// })
module.exports = mongoose.model('Product', productModel)
