const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/User')
const FriendReq = require('../models/FriendReq')


router.get("/", (req, res)=>{
    res.send("Welcome to the friends route.")
})

router.patch("/add", async (req, res)=>{
    console.log(req.user.username + " is sending a friend request to " + req.body.targetfriend)

    User.findOneAndUpdate({"_id":req.body.targetfriend},
    {$addToSet: {requests: req.user.userid._id}}, 
    function(err, founduser){
        if(err){
            console.log(err)
        }
        else{
            console.log(req.user.username + " has successfully sent a friend request to " + founduser.username + "(id: " + founduser._id + ")")
        }
    })


    res.send("Friend request sent.")
})

router.patch("/accept", async (req, res)=>{
    //const targetFriend = await User.findOne({"username":req.body.targetfriend}, 'username _id requests')
    console.log(req.user.username + " is accepting a friend request from " + req.body.targetfriend)

    User.findOneAndUpdate({"_id":req.user.userid._id}, 
        {$addToSet: {friends: req.body.targetfriend}, $pull: {requests:req.body.targetfriend}},
        function(err, founduser){
            if(err){
                console.log(err)
            }
            else{
                console.log(founduser.username + " has successfully accepted " + req.body.targetfriend + "'s friend request.")
            }
        }
    )


    res.send("Friend request accepted.")
})

router.get("/myfriends", async (req, res)=>{
    const joinedFriendList = await User.findOne({"_id":req.user.userid._id}).populate("friends", "_id username userpictureurl")

    res.json(joinedFriendList.friends)

})

router.get("/friendrequests", async (req, res)=>{
    const joinRequestList = await User.findOne({"_id":req.user.userid._id}).populate("requests", "_id username userpictureurl")

    res.json(joinRequestList.requests)

})

module.exports = router