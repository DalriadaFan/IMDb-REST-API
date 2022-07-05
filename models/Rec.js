const mongoose = require('mongoose')
const User = require('./User')
const TVShow = require('./TVShow')

const recSchema = new mongoose.Schema({
    Sender: mongoose.SchemaTypes.ObjectId,
    Recipient: mongoose.SchemaTypes.ObjectId,
    TVShowID: String
})

module.exports = mongoose.model("rec", recSchema)