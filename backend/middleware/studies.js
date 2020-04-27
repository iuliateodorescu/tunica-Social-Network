const { City, University, Faculty } = require('../models/studies')


const models = {
  faculty: Faculty,
  city: City,
  university: University,
}

async function create(model, data) {
  const obj = await new models[model](data)
  return await obj.save()
}

async function getAll(model) {
  return await models[model].find()
}

module.exports = {
  create,
  getAll
}
