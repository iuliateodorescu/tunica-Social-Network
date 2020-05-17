const { Profile } = require('../models/profile.model')
const { User } = require('../models/user.model')
const userModel = require('../models/user.model')
const generalMid = require('./general')
const fs = require('fs')

const setProfile = async (req, res) => {
  try {
    const profile = new Profile({ ...req.body })
    const userId = generalMid.decoded(req.headers)._id
    const user = await User.findById(userId)
    user.profile = profile
    await profile.save()
    await user.save()
    res.status(200).send({})
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.body._id,req.body)
    const userId = generalMid.decoded(req.headers)._id
    const user = await User.findById(userId)
    user.profile = profile
    await user.save()
    res.status(200).send({})
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}


const getProfile = async (req, res) => {
  try {
    const userId = generalMid.decoded(req.headers)._id
    const user = await User.findById(userId).select('profile')
    const profile = await Profile.findById(user.profile)
    console.log(user.profile)
    // console.log(profile)
    res.json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

const uploadPhoto = async (req, res, next) => {
  try {
    const modelName = `profile.photo`
    const file = req.file
    if (!file) {
      res.status(400).send("Didn't receive a file")
    }
    const decoded = generalMid.decoded(req.headers)
    await userModel.User.update(
      { _id: decoded._id },
      { [modelName]: file.filename }
    )
    res.send(file)
  } catch (err) {
    res.status(400).send(err)
  }
}

const getImage = async (req, res) => {
  const { filename } = req.params
  fs.readFile(generalMid.getFile(filename), function (err, data) {
    if (err) throw err
    res.send(data)
  })
}

module.exports = {
  setProfile,
  getProfile,
  uploadPhoto,
  getImage,
  update
}
