const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const groupsRoute = require('../middleware/groups')
const university = require('../middleware/university')

router.use('/user', userRoute)
router.use('/groups', groupsRoute)
router.use('/university', university)


module.exports=router