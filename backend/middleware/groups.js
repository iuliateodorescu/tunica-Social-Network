const { Group } = require('../models/group')
const { User } = require('../models/user.model')
const { Post } = require('../models/post')
const auth = require('./auth')
const express = require('express')
const router = express.Router()

async function create(req, res) {
  try {
    const group = new Group(req.body)
    await group.save()
    res.send({})
  } catch (err) {
    console.error(err)
    res.status(400).send('Invalid form')
  }
}

async function getAll(req, res) {
  const groups = await Group.find()
  res.send(groups)
}

async function addUserToGroup(req, res) {
  try {
    const { userId, groupId } = req.body
    const group = await Group.findById(groupId)
    group.members.push(userId)
    await group.save()
    const user = await User.findById(userId)
    if (!user.groups) {
      user.groups = []
    }
    user.groups.push(groupId)
    await user.save()
    res.status(200).send({})
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

const getPosts = async (req, res, next) => {
  try {
    const groupsId = req.params.id
    const group = await Group.findById(groupsId).populate({
      path: 'posts',
      model: 'Post',
      populate: {
        path: 'author',
        model: User,
        populate: {
          path: 'profile',
          model: 'Profile',
          populate: { path: 'university', model: 'University' },
        },
      },
    })
    let posts = group.posts
    res.json(posts)
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
}

router.post('/create', create)
router.post('/addUserToGroup', addUserToGroup)
router.get('/getAll', getAll)
router.get('/getPosts/:id', auth, getPosts)

module.exports = router
