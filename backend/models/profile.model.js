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
    photo: {
        type: String,
    },
})

const Profile = mongoose.model('Profile', ProfileSchema)
exports.Profile = Profile
exports.ProfileSchema = ProfileSchema