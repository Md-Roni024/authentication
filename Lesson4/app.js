const express = require('express')
require('dotenv').config()
const cors = require('cors')
const {connect} = require('./config/connect.database')
const User = require('./model/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express()

PORT = process.env.PORT || 5000 
//Database Connect
connect()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send('Home Route')
})

app.post('/register',async (req,res)=>{
    const {email,password}  = req.body
    console.log('MyEmail:',email)
    console.log('Password:',password)
    try{
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const newUser = new User({
                email:email,
                password:hash
            })
            await newUser.save()
            res.status(201).json(newUser)
        });
    }catch(err){
        console.log(err)
        console.log('User Not Created || Error Occur')
    }
})

app.post('/login', async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    bcrypt.compare(password, user.password, function(err, result) {
        if(result===true){
            res.status(200).json({
                status:'Valid User'
            })
        }
        else{
            res.status(404).json({
                status:'Not a valid user'
            })
        }
    });
})

app.listen(PORT,()=>{
    console.log(`Server Running at: http://localhost:${PORT}`)
})