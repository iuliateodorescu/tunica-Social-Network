const multer = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/../assets/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({
  storage: storage
})


module.exports = upload.single('file')