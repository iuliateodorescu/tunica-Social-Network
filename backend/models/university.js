const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UniSch = new Schema({
  name: { type: String, unique: true },
  city: String,
  faculties: [String],
})

const University = mongoose.model('University', UniSch)

exports.University = University
