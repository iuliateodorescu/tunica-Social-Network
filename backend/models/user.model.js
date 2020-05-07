const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')
const { Group } = require('./group')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Group,
    unique: true
  },
})

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.get('privateKey')
  )
  return token
}

function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(10).required(),
  }

  return Joi.validate(user, schema)
}

const User = mongoose.model('User', UserSchema)

exports.User = User
exports.validate = validateUser
