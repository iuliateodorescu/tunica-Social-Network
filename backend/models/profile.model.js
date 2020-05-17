const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
    },
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
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    photo: {
        type: String,
    },
})

const Profile = mongoose.model('Profile', ProfileSchema)
exports.Profile = Profile
exports.ProfileSchema = ProfileSchema