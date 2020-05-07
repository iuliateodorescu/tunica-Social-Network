const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { User } = require('./user.model')
const CommentSchema = new Schema({
  author: {
    type: [Schema.Types.ObjectId],
    ref: User,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 255,
  },
})
const Comment = mongoose.model('Comment',CommentSchema)
const GroupSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  image: {
    type: String,
    maxlength: 255,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: User,
    unique: true,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: Comment,
    unique: true,
  },
})

const Group = mongoose.model('Group', GroupSchema)

exports.Group = Group
