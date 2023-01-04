const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utills/generateToken.js')

// @Route POST api/user/
// @Desc create user object
// @Access Public
// @Param {name, email, password}

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    cart: user.cart,
    token: generateToken(user._id),
  })
})

// @Route POST api/user/change-password
// @Desc change user password
// @Access Private
// @Param {password, newPassword}

const changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body
  const user = await User.findById(req.user._id)
  const checkPassword = await User.matchPassword(password)

  if (!checkPassword) {
    res.status(401)
    throw new Error('Incorrect password')
  }
  user.password = newPassword
  await user.save()
  res.json({ message: 'Password changed successfully' })
})

// @Route POST api/user/
// @Desc login user with password
// @Access Public
// @Param {email, password}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      cart: user.cart,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @Route DELETE api/user/
// @Desc delete user object
// @Access Privates
// @Param {userId}

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  await user.remove()
  res.json({ message: 'User removed successfully' })
})

// @Route GET api/user/
// @Desc get login user
// @Access Privates

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
})

// @Route GET api/users/
// @Desc get all users
// @Access Privates, Admin

const getAllUsers = asyncHandler(async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 20,
  }
  const userCount = await User.find({}).countDocuments()
  const numberOfPages = userCount / pageOptions.limit
  const users = await User.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)

  res.json({
    users,
    page: pageOptions.page,
    numberOfPages,
  })
})

// @Route GET api/users/:userId
// @Desc get single user
// @Access Privates, Admin

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  }
  res.status(404)
  throw new Error('User not found')
})

module.exports = {
  createUser,
  changePassword,
  loginUser,
  deleteUser,
  getUser,
  getAllUsers,
  getSingleUsers,
}
