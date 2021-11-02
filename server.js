const express = require('express');
const uuid = require('uuid').v4
const session = require('express-session')
const FileStore = require('session-file-store')(session);

const app = express();

app.use(express.json())

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() 
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`Hello Ritesh, This is your home page\n`)
})

app.get('/login',(req,res)=>{
    console.log("Inside the GET/login callback function")
    console.log(req.sessionID)
    res.send("You got the login page\n")
})

app.post('/login',(req,res)=>{
    console.log("Inside the POST/login callback function")
    console.log(req.body)
    res.send('You posted to the login page\n')
})

app.listen(3000, () => {
  console.log('app listen on port 3000')
})

