const express = require('express')
const router = express.Router()
const general = require('./general')
const auth = require('./auth')
const { Post } = require('../models/post')
const { User } = require('../models/user.model')

const addPost = async (req, res, next) => {
  try {
    const user = general.decoded(req.headers)
    const post = req.body
    if (post.type === 'group') {
      //notifyGroup
    } else if (post.type === 'personal') {
      //notifyFriends
    }
    post.author = user._id
    const savedPost = new Post(post)
    await savedPost.save()
    const userModel = await User.findById(user._id)
    userModel.posts.push(savedPost)
    await userModel.save()
    res.status(201).send({})
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}

const getOwn = async (req, res, next) => {
  const userInfo = general.decoded(req.headers)
  const user = await User.find({ id: userInfo._id }).populate('posts')
  console.log(user)
  res.send({})
}

router.post('/', auth, addPost)
router.get('/getOwn', auth, getOwn)

module.exports = router
