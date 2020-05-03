const { Profile } = require('../models/profile.model')
const userModel = require('../models/user.model')
const generalMid = require('./general')
const fs = require('fs')

const setProfile = async (req, res) => {
  const profile = new Profile({ ...req.body })
  const decoded = generalMid.decoded(req.headers)
  const modelName = `profile`
  await userModel.User.update({ _id: decoded._id }, { [modelName]: profile })
  userModel.User.findOne({ email: decoded.email }).exec((err, result) => {
    res.send({ status: `Created profile ${result[modelName]}` })
    return
  })
}

const getProfile = async (req, res) => {
  const modelName = `profile`
  const decoded = generalMid.decoded(req.headers)
  userModel.User.findOne({ _id: decoded._id }).exec((err, result) => {
    res.send(result[modelName])
    return
  })
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
  fs.readFile(generalMid.getFile(filename), function(err, data) {
    if (err) throw err
    res.send(data)
  })
}

module.exports = {
  setProfile,
  getProfile,
  uploadPhoto,
  getImage,
}