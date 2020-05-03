const auth = require('../middleware/auth')
const { User, validate } = require('../models/user.model')
const express = require('express')
const profileMiddleware = require('../middleware/profile')
const router = express.Router()
const upload = require('../middleware/upload')

router.post('/', auth, profileMiddleware.setProfile)
router.get('/', auth, profileMiddleware.getProfile)
router.post('/photo', [auth, upload], profileMiddleware.uploadPhoto)
router.get('/photo/:filename',profileMiddleware.getImage)
module.exports = router