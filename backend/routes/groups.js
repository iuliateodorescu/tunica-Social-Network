const auth = require('../middleware/auth')
const { User, validate } = require('../models/user.model')
const express = require('express')
const groupsMid = require('../middleware/groups.js')
const router = express.Router()

router.post('/create', groupsMid.create)
router.get('/getAll',groupsMid.getAll)

module.exports=router