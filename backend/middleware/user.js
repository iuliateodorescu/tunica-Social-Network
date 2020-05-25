const { User, validate } = require('../models/user.model')
const { Profile } = require('../models/profile.model')
const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    try {
        console.log(req.body)
      const { error } = validate(req.body)
      console.log(error);
      if (error) return res.status(400).send(error.details[0].message)
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        res.status(400).send('User already registered.')
        return
      }
      user = new User({
        password: req.body.password,
        email: req.body.email,
      })
      user.password = await bcrypt.hash(user.password, 10)
      await user.save()

      const token = user.generateAuthToken()
      res.header('x-auth-token', token).send({
        _id: user._id,
        email: user.email,
      })
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  login: async (req, res) => {
    let reqUser = req.body
    let dbUser = await User.findOne({ email: req.body.email })
    if(!dbUser) {
        res.status(400).send("User does not exist")
        return
    }
    bcrypt
      .compare(reqUser.password, dbUser.password)
      .then(equal => {
        if (equal) {
          const user = dbUser
          const token = user.generateAuthToken()
          res.header('x-auth-token', token).send({
            _id: user._id,
            email: user.email,
          })
        } else {
          res.status(400).send('Wrong password')
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(err)
      })
  },

  getCurrent: async (req, res) => {
    console.log(userId)
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
  },

  addFriend: async (req, res) => {
    try{
      const {senderId, receiverId} = req.body
      const sender = await User.findById(senderId)
      const receiver = await User.findById(receiverId)
      sender.friends.push(receiverId)
      await sender.save()
      receiver.friends.push(senderId)
      await receiver.save()
      res.status(200).send({}) 
    }catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getFriends: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findById(userId)
      let friends = user.friends
      res.json(friends)
    } catch (err) {
      res.status(500).json(err)
      console.error(err)
    }
  },

  getFriendProfile: async (req, res) => {
    try {
      const friendId = req.body.id
      console.log(friendId)
      const profile = await Profile.findById(friendId)
      res.json(profile)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },


  getAll: async (req, res) => {
    const users = await User.find({}).populate({
      path:'profile',
      model: 'Profile'
    })
    res.send(users)
  }
 
}
