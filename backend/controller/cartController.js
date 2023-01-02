const User = require('../models/userModel.js')
const Products = require('../models/ProductModel')

const addToCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { productId, quantity } = req.body
  const productExistOnCart = user.cart.some((e) => e.productId === productId)
  const product = await Products.findById(productId)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  if (productExistOnCart) {
    const updatedCart = user.cart.map((e) => {
      if (e.productId === productId) {
        return {
          ...e,
          quantity: e.quantity + quantity,
        }
      } else {
        return e
      }
    })
    user.cart = updatedCart
    await user.save()
  }
  res.status(200).json(user.cart)
})

const removeFromCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const productExistOnCart = user.cart.some(
    (e) => e.productId === req.params.productId
  )
  if (!productExistOnCart) {
    res.status(404)
    throw new Error('Product not found')
  }

  const removedCart = user.cart.filter(
    (e) => e.productId !== req.params.product
  )
  user.cart = removedCart
  await user.save()
  res.status(202).json(removedCart)
})
