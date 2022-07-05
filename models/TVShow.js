const mongoose = require('mongoose')

const tvshowSchema = new mongoose.Schema({
    _id: String,
    TVShowTitle: String,
    TVShowImage: String,
    TVReleaseYear: Number,
    TVShowActors: [String],
    TVShowSynopsis: String
})

module.exports = mongoose.model("tv_shows", tvshowSchema)