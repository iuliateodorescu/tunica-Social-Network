const auth = require('../middleware/auth')
const { User, validate } = require('../models/user.model')
const express = require('express')
const userMiddleware = require('../middleware/user')
const router = express.Router()

router.get('/', auth, userMiddleware.getCurrent)
router.post('/register', userMiddleware.register)
router.post('/login', userMiddleware.login)
router.post('/addFriend', userMiddleware.addFriend)
router.get('/getAll', userMiddleware.getAll)


module.exports = router