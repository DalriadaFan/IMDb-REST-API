const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = 4000
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User')
const flash = require('express-flash')
const jwt = require('jsonwebtoken')
const { send } = require('express/lib/response')
const res = require('express/lib/response')

app.use(express.json())

app.listen(port, '192.168.100.164', () => {
    console.log(`Auth server listening on port ${port}`)
})

mongoose.connect(process.env.DB_URL, ()=>{
    console.log("Connected to database!")
})

app.post('/register', async (req, res)=>{
    const user = await User.findOne({username: req.body.username})
    if(user){
      return res.send("Username unavailable.")
    } 
  
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const autoGenPicture = "https://picsum.photos/seed/" + req.body.username + "picsum/500"
      console.log(autoGenPicture)
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        userpictureurl: autoGenPicture
      })
      const savedUser = await user.save()
      res.json(savedUser)
    } catch (error) {
      res.json({message:error})
    }
  })
  
app.post('/login', async (req, res)=>{
    console.log("I'm being called!")
    const user = await User.findOne({username: req.body.username})
    if(user==null){
        return res.send("Incorrect username or password.")
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)){
        const userDetails = await User.findOne({username:req.body.username}, '_id userpictureurl')
        const loggedInUser = {username: req.body.username, _id: userDetails._id}
        console.log(loggedInUser)

        const accessToken = generateAccessToken(loggedInUser)
        const refreshToken = jwt.sign(loggedInUser, process.env.REFRESH_TOKEN_SECRET)
        res.json({
           userid: loggedInUser._id, 
           username:loggedInUser.username,
           userpic: userDetails.userpictureurl,
           accessToken: accessToken, 
           refreshToken: refreshToken
          })
        
        }
        else{
        res.send("Not allowed.")
        }
    }catch{
        res.status(500).send()
    }
})

app.get('/', (req, res)=>{
    res.send("Hello from the AuthServer!")
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'24h'})
}
  

  