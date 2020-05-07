const express = require('express')
const router = express.Router()
const general = require('./general')

const addPost = async (req,res,next) => {
    const user = general.decoded(req.headers)
    console.log(user)
}