const User = require('../models/userModel.js')
const Product = require('../models/productModel.js')
const asyncHandler = require('express-async-handler')

// @Route POST api/products/
// @Desc get all products
// @Access Public

const getAllProducts = asyncHandler(async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 20,
  }
  const productCount = await Product.find({}).countDocuments()
  const numberOfPages = userCount / pageOptions.limit

  // finding active products without description
  let products = await Product.find({ active: true, stockOut: false })
    .select('-description -active -rating')
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort({ createdAt: -1 })

  res.json({ productCount, numberOfPages, products })
})

// @Route POST api/product/
// @Desc create product
// @Access Private, Admin only

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, active, poster } = req.body
  const product = await Product.create({
    title,
    description,
    price,
    active,
    poster,
  })
  res.status(201).json({ message: 'Product created successfully' })
})

// @Route GET api/product/:id
// @Desc get single product
// @Access Public

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json({
      product,
      reviw: product.rating.slice(0, 5),
    })
  }
  res.status(404)
  throw new Error('Product not found')
})

// @Route PUT api/product/:id
// @Desc update product
// @Access Private, Admin only

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.title = req.body.title || product.title
    product.description = req.body.description || product.description
    product.price = req.body.price || product.price
    product.active = req.body.active || product.active
    product.poster = req.body.poster || product.poster
    product.stockOut = req.body.stockOut || product.stockOut
    res.json({ message: 'Product updated successfully' })
  }

  res.status(404)
  throw new Error('Product not found')
})
// @Route DELETE api/product/:id
// @Desc deleting product
// @Access Privates, Admin only

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.status(202)
    res.json({ message: 'Product removed successfully' })
  }
  res.status(404)
  throw new Error('Product not found')
})

// @Route POSR api/products/review/:id
// @Desc add review to product
// @Access Private

const addReview = asyncHandler(async (req, res) => {
  const { star, comment } = req.body
  const product = await Product.findById(req.params.id)
  const user = await User.findById(req.user._id)
  const alredyBought =
    user && user?.buyingHistory.find((e) => e === req.user._id)
  if (product && alredyBought) {
    const alreadyRated = product.rating.find((e) => e.user === req.user._id)
    if (alreadyRated) {
      res.status(400)
      throw new Error('You have already rated this product')
    }
    product.rating.unshift({
      user: req.user._id,
      star,
    })
    res.status(201).json({ message: 'Review added successfully' })
  }

  if (!alredyBought) {
    throw new Error('Buy first to review the product')
  }

  res.status(404)
  throw new Error('Product not found')
})

// @Route GET api/products/review/:reviewId
// @Desc get product reviews
// @Access Public

const getReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.reviewId)
  if (product) {
    res.json(product.rating)
  }

  res.status(404)
  throw new Error('Product not found')
})

// @Route DELETE api/products/review/:productId/:reviewId
// @Desc delete product review
// @Access Private

const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)
  if (product) {
    product.rating = product.rating.filter((e) => e.id !== req.params.reviewId)
    product.save()
    res.status(202)
    res.json({ message: 'Review deleted successfully' })
  }
  res.status(404)
  throw new Error('Product not found')
})

//@Route PUT /api/product/change-status/:id
//@Desc change product status
//@Access Private, Admin Only

const changeStatus = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.active = !product.active
    product.save()
  }

  res.status(404)
  throw new Error('Product not found')
})

//@Route GET /product/search
//@Desc search product
//@Access Private

const searchProduct = asyncHandler(async (req, res) => {
  const { search } = req.query
  const searchTerm = RegExp(search, 'i')

  const products = await Product.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } })

  res.json(products)
})

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getReviews,
  deleteReview,
  changeStatus,
  searchProduct,
}
