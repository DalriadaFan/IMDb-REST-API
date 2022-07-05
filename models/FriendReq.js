const mongoose = require('mongoose')

const friendReqSchema = new mongoose.Schema({
    Sender: mongoose.SchemaTypes.ObjectId,
    Recipient: mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("friend_reqs", friendReqSchema)