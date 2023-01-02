const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utills/generateToken.js')

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

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user.id)
  await user.remove()
  res.sendStatus(202)
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
})

module.exports = {
  createUser,
  changePassword,
  loginUser,
  deleteUser,
  getUser,
}
