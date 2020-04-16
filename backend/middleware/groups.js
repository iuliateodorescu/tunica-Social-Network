const { Group } = require('../models/group')

async function create(req, res) {
  console.log(req.body)
  try {
  const group = new Group(req.body)
  console.log(group)
  await group.save()
  res.send({})
  } catch (err) {
      console.error(err)
      res.status(400).send("Invalid form")
  }
}

async function getAll(req,res) {
    const groups = await Group.find();
    console.log(groups)
    res.send(groups)
}

module.exports = { create, getAll }
