const express = require('express')
const multer = require('multer')
const { authUser, adminUser } = require('../middleware/authMiddleware.js')
const { body, check } = require('express-validator')
const upload = require('../utills/storage.js')

const {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  addReview,
  getReviews,
  deleteReview,
  searchProducts,
} = require('../controller/productController')

const router = express.Router()

router
  .route('/')
  .get(getAllProducts)
  .post(
    authUser,
    upload.single('poster'),
    [
      body('title', 'title lenght atleast 3 charechter').isLength({
        min: 3,
        max: 250,
      }),
      body('description', "description cant't be empty").notEmpty(),
      body('price').isNumeric(),
    ],
    createProduct
  )

router.get('/search/', searchProducts)

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

router
  .route('/reviews/:id')
  .post(
    authUser,
    [
      body('star').notEmpty().isNumeric(),
      body('message').isLength({ min: 2, max: 1024 }),
    ],
    addReview
  )
  .get(getReviews)
  .delete(authUser, deleteReview)

module.exports = router
