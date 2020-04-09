const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        unique: true,
    },
    university: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
})

const Profile = mongoose.model('Profile', ProfileSchema)