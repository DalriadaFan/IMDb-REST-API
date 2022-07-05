const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userpictureurl: String,
    favorites: [String],
    friends: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    }],
    requests: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    }]
})

module.exports = mongoose.model("users", userSchema)