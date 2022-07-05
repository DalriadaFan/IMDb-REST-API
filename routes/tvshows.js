const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const TVShow = require('../models/TVShow')


router.get("/", (req, res)=>{
    res.send("TV Shows!")
})

router.get("/all", async (req, res)=>{
    console.log("All TV shows requested by: " + req.user.username)

    try {
        const list = await TVShow.find()
        res.json(list)
        
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router