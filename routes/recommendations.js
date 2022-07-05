const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Recommendation = require('../models/Rec')


router.get("/", (req, res)=>{
    res.send("Recommendations")
})

router.get("/send", async (req, res)=>{
    console.log(req.user.username)

    try {
        const list = await TVShow.find()
        res.json(list)
        
    } catch (error) {
        res.json({message: error})
    }

})

module.exports = router