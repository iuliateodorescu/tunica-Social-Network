const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const groupsRoute = require('../middleware/groups')
const university = require('../middleware/university')
const profile = require('./profile')

router.use('/user', userRoute)
router.use('/groups', groupsRoute)
router.use('/university', university)
router.use('/profile', profile)

module.exports = router
