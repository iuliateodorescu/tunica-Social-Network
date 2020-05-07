const express = require('express')
const studies = require('../middleware/studies.js')
const router = express.Router()

router.post('/create/:model', async (req, res) => {
  const obs = await studies.create(req.params.model, req.body)
  if (!obs) {
    res.sendStatus(500)
  } else {
    res.sendStatus(201)
  }
})

router.get('/getAll/:model', async (req, res) => {
  const obs = await studies.getAll(req.params.model)
  if (!obs) {
    res.sendStatus(500)
  } else {
    res.send(obs)
  }
})

module.exports = router
