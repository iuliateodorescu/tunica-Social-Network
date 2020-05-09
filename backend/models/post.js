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
const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 255,
  },
  image: {
    type: String,
    maxlength: 255,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: User,
    default: []
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: Comment,
    default: []
  },
})

const Post = mongoose.model('Post', PostSchema)

exports.Post = Post
