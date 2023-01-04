const express = require('express')
const {
  loginUser,
  getUser,
  deleteUser,
  createUser,
  changePassword,
  getAllUsers,
} = require('../controller/userController')

const router = express.Router()

router.route('/').post(loginUser).get(getUser).delete(deleteUser)
router.post('/change-password', changePassword)
router.post('/register', createUser)
router.get('/allusers', getAllUsers)

module.exports = router
