const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const groupsRoute = require('./groups')
const studiesRoute = require('./studies')

router.use('/user', userRoute)
router.use('/groups', groupsRoute)
router.use('/studies', studiesRoute)

module.exports=router