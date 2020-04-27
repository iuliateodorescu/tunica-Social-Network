const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
  name: String,
})

const City = mongoose.model('City', CitySchema)

const UniversitySchema = new Schema({
  name: String,
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
})

const University = mongoose.model('University', UniversitySchema)

const FacultySchema = new Schema({
  name: String,
  University: {
    type: Schema.Types.ObjectId,
    ref: 'University',
  },
})

const Faculty = mongoose.model('Faculty', FacultySchema)

module.exports = { City, University, Faculty }
