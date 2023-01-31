const { faker } = require('@faker-js/faker')
const User = require('./models/userModel.js')
const Product = require('./models/ProductModel.js')
const connectDb = require('./utills/conectDb.js')
const dotenv = require('dotenv')

dotenv.config()

connectDb()

const insertData = async () => {
  await Product.deleteMany()
  const user = await User.create({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: 'sarasami',
  })
  try {
    const userEmail = user.email
    for (let i = 0; i < 100; i++) {
      await Product.create({
        title: faker.commerce.productName(),
        user: userEmail,
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        poster: faker.image.fashion(),
      })
      console.log(i)
    }
    process.exist(1)
  } catch (e) {
    console.error(e)
  }
}

insertData()
