const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const groupsRoute = require('../middleware/groups')
const university = require('../middleware/university')
const profile = require('./profile')

const general = require('../middleware/general')
const post = require('../middleware/posts')

router.use('/user', userRoute)
router.use('/groups', groupsRoute)
router.use('/university', university)
router.use('/profile', profile)
router.use('/general',general.router)
router.use('/post',post)
module.exports = router
