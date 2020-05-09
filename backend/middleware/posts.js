const express = require('express')
const router = express.Router()
const general = require('./general')
const auth = require('./auth')
const { Post, Comment } = require('../models/post')
const { User } = require('../models/user.model')
const { Group } = require('../models/group')

const addPost = async (req, res, next) => {
  try {
    const user = general.decoded(req.headers)
    const post = req.body
    post.author = user._id
    const savedPost = new Post(post)
    await savedPost.save()
    const userModel = await User.findById(user._id)
    userModel.posts.push(savedPost)
    await userModel.save()
    if (post.type.text === 'group') {
      console.group(post.type.groupId)
      const { groupId } = post.type
      const group = await Group.findById(groupId)
      group.posts.push(savedPost)
      group.save()
      group.members.forEach(async (memberId) => {
        const member = await User.findById(memberId)
        member.posts.push(savedPost)
        member.save()
      })
    } else if (post.type.text === 'personal') {
      //notifyFriends
    }
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
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

const addComment = async (req, res, next) => {
  try {
    const userId = general.decoded(req.headers)._id
    const comment = new Comment({ ...req.body, author: userId })
    await comment.save()
    const post = await Post.findById(req.params.postId)
    post.comments.push(comment._id)
    await post.save()
    res.status(201).send({})
  } catch (err) {
    console.error(err)
    res.status(400).json(err)
  }
}

const getComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({
        path: 'comments',
        model: Comment,
        populate: { path: 'author', model: User },
      })
      .select('comments')
    res.json(post.comments)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

router.post('/', auth, addPost)
router.get('/getOwn', auth, getOwn)
router.post('/like/:postId', auth, likePost)
router.post('/addComment/:postId', auth, addComment)
router.post('/comments/:postId', auth, getComments)

module.exports = router
