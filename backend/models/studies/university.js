const mongoose = require('mongoose')
const Schema = mongoose.Schema
const University = new Schema({
  name: String,
  city: {
    type: [Schema.Types.ObjectId],
    ref: 'City',
  },
})

const University = mongoose.model('University', University)

exports.University = University
