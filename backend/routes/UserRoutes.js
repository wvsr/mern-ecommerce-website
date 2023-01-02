const express = require('express')
const router = express.Router()
const {
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controller/userController')
router
  .route('/')
  .post(loginUser)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

router.post('/register', createUser)

module.exports = route
