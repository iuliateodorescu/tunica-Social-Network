const express = require('express')
const router = express.Router()
const { University } = require('../models/university')
const list = require('../resources/universities')

const getAll = async (req, res) => {
  res.send(await University.find())
}

const init = async (req, res) => {
  try {
    await University.insertMany(list)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

router.get('/', getAll)
router.get('/init', init)
module.exports = router
