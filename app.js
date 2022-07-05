const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const tvshowRouter = require('./routes/tvshows')
const friendsRouter = require('./routes/friends')
const TVShow = require('./models/TVShow')
require('dotenv').config()
const User = require('./models/User')
const flash = require('express-flash')
const jwt = require('jsonwebtoken')
const { send } = require('express/lib/response')

app.listen(port, '192.168.100.164', () => {
  console.log(`API server listening on port ${port}`)
})

mongoose.connect(process.env.DB_URL, ()=>{
  console.log("Connected to database!")
})

app.use(express.json())

app.use(express.urlencoded({extended:false}))


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if (token==null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403)
    req.user=user
    next()
  })
}

app.get('/', authenticateToken, (req, res) => {
  console.log("API home requested by: " + req.user.username + " " + req.user.userid._id)
  res.send("Welcome to the MicroIMDB API")
})

app.use('/tvshows', authenticateToken, tvshowRouter)
app.use('/friends', authenticateToken, friendsRouter)