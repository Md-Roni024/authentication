const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const app = express()
const User = require('./model/user')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 5000 
const DB_URL = process.env.MONGO_URL

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Database is Connected')
})
.catch((err)=>{
    console.log(err)
    console.log('Database connection error')
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/./views/index.html')
})
app.post('/register', async (req,res)=>{
    try{
        const newUser = new User(req.body)
        console.log(newUser)
        await newUser.save()
        res.status(201).json(newUser)
    }catch(err){
        console.log(err)
        res.status(404).json('User not create ||  Error Occur')
    }
})
app.post('/login',async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.findOne({email:email})
        console.log(user.password)
        if( user && user.password === password){
            res.status(200).json('User Login Successfully')
        }else{
            res.status(404).json('Password or Email not match.')
        }
    }catch(err){
        res.status(404).json('User not create ||  Error Occur')
    }
    

    // res.sendFile(__dirname+'/./views/login.html')
})

app.listen(PORT,(req,res)=>{
    console.log(`Server Running at http://localhost:${PORT}`)
})


