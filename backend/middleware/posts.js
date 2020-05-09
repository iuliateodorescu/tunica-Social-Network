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
  try {
    const userInfo = general.decoded(req.headers)
    const user = await User.find({ _id: userInfo._id })
      .populate({
        path: 'posts',
        model: Post,
        populate: { path: 'author', model: User },
      })
      .select('posts')
    let posts = user[0].posts
    console.log(posts)
    res.json(posts)
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
}

const likePost = async (req, res, next) => {
  try {
    const userId = general.decoded(req.headers)._id
    const { postId } = req.params
    const post = await Post.findById(postId)

    if (post.likes.includes(userId)) {
      post.likes.pop(userId)
    } else {
      post.likes.push(userId)
    }
    await post.save()
    console.log(post)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

router.post('/', auth, addPost)
router.get('/getOwn', auth, getOwn)
router.post('/like/:postId', auth, likePost)

module.exports = router
