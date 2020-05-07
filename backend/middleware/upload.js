const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../assets/images')
  },
  filename: function (req, file, cb) {
    console.log(Object.keys(file))
    cb(null, Date.now() + (Math.random() * 100).toFixed(0) + '-'+ file.originalname)
  },
})

const upload = multer({
  storage: storage,
})

module.exports = upload.single('file')
