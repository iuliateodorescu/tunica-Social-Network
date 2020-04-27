const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Faculty = new Schema({
  name: String,
  University: {
    type: [Schema.Types.ObjectId],
    ref: 'University',
  },
})

const Faculty = mongoose.model('Faculty', Faculty)

exports.Faculty = Faculty
