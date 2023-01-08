const express = require('express')
const { body } = require('express-validator')

const {
  loginUser,
  getUser,
  deleteUser,
  createUser,
  changePassword,
  getAllUsers,
  getSingleUser,
  deleteUserById,
} = require('../controller/userController')
const { authUser } = require('../middleware/authMiddleware.js')

const router = express.Router()

router
  .route('/')
  .post(
    [
      body('email', 'The email address you entered is invalid').isEmail(),
      body(
        'password',
        'Your password must be at least 8 characters long'
      ).isLength({ min: 8, max: 62 }),
    ],
    loginUser
  )
  .get(authUser, getUser)
  .delete(authUser, deleteUser)

router.post(
  '/change-password',
  [
    body('password', 'this password is invalid').isLength({ min: 8, max: 62 }),
    body(
      'newPassword',
      'Your password must be at least 8 characters long'
    ).isLength({ min: 8, max: 62 }),
  ],
  authUser,
  changePassword
)
router.post(
  '/register',
  [
    body('name', 'Your name must be at least 8 characters long').isLength({
      min: 4,
      max: 24,
    }),
    body('email', 'You enterd invalid email address').isEmail(),
    body('password', 'this password is invalid').isLength({ min: 8, max: 62 }),
  ],
  createUser
)
router.get('/all', authUser, getAllUsers)
router
  .route('/single/:id')
  .get(authUser, getSingleUser)
  .delete(authUser, deleteUserById)
module.exports = router
