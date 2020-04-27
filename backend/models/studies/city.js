const mongoose = require('mongoose')
const Schema = mongoose.Schema
const City = new Schema({
  name: String
})

const City = mongoose.model('City', City)

exports.City = City
