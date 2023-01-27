const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    format: 'jpeg',
    folder: process.env.CLOUDINARY_FOLDER_NAME,
  },
})

const upload = multer({ storage: storage })
module.exports = upload
