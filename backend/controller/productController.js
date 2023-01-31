const User = require('../models/userModel.js')
const Product = require('../models/productModel.js')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

// @Route POST api/product/
// @Desc get all products
// @Access Public

const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const count = await Product.countDocuments()
  let products = await Product.find({})
    .select('-description -rating')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })

  res.json({
    products,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  })
})

// @Route POST api/product/
// @Desc create product
// @Access Private, Admin only

const createProduct = asyncHandler(async (req, res) => {
  // validating data
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { title, description, price } = req.body
  const product = await Product.create({
    title,
    description,
    price,
    poster: req.file.path,
  })
  console.log(product)
  res.status(201).json({ message: 'Product created successfully' })
})

// @Route GET api/product/:id
// @Desc get single product
// @Access Public

const getProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404)
    throw new Error('Invalid product id')
  }
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json({
      ...product._doc,
      rating: product.rating.slice(0, 5),
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
    product.poster = req.body.poster || product.poster
    product.save()
    console.log(product)
    return res.json({ message: 'Product updated successfully', product })
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

// @Route POST api/product/review/:id
// @Desc add review to product
// @Access Private

const addReview = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  if (req.params.id) {
    if (!mongoose.isValidObjectId(req.params.id))
      throw new Error('Invalid id: ' + req.params.id)
  }
  const { star, message } = req.body
  let product = await Product.findById(req.params.id)
  const user = await User.findById(req.user._id)
  const alredyBought =
    user && user?.buyingHistory.find((e) => e.toString() === req.params.id)
  if (product && alredyBought) {
    // check if product is already rated
    const alreadyRated = product.rating.find(
      (e) => e.user.toString() === req.user.id
    )

    if (alreadyRated) {
      res.status(400)
      throw new Error('You have already rated this product')
    }
    // push the review
    product.rating = product.rating.concat({
      user: req.user._id,
      star,
      message,
      name: req.user.name,
    })
    product.star =
      product.rating.reduce((sum, rating) => sum + rating.star, 0) /
      product.rating.length
    await product.save()
    return res
      .status(201)
      .json({ message: 'Review added successfully', product })
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
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product.rating.slice(0, 20))
  }

  res.status(404)
  throw new Error('Product not found')
})

// @Route DELETE api/products/review/:productId/:reviewId
// @Desc delete product review
// @Access Private

const deleteReview = asyncHandler(async (req, res) => {
  // check the object id
  if (req.params.id) {
    if (!mongoose.isValidObjectId(req.params.id))
      throw new Error('Invalid id: ' + req.params.id)
  }
  const product = await Product.findById(req.params.id)
  if (product) {
    if (!product.rating.find((e) => e.user.toString() === req.user.id)) {
      throw new Error('You did not rate it')
    }
    console.log(product.rating.length)
    product.rating = product.rating.filter((e) => {
      e.id.toString() !== req.params.id
    })
    console.log(product.rating.length)
    await product.save()
    res.status(202)
    return res.json({
      message: 'Review deleted successfully',
      rating: product.rating,
    })
  }
  res.status(404)
  throw new Error('Product not found')
})

//@Route GET /product/search
//@Desc search product
//@Access Private

const searchProducts = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 20 } = req.query

  if (!query) return res.redirect('/')

  const searchTerm = RegExp(query, 'i')
  const count = await Product.countDocuments()
  const products = await Product.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .select('-description -updatedAt -createdAt -rating -score')
    .limit(limit * 1)
    .skip((page - 1) * limit)

  res.json({
    products,
    totalPages: products === [] ? Math.ceil(count / limit) : 0,
    currentPage: Number(page),
  })
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
  searchProducts,
}
