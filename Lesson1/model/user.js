const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        requierd:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users",UserSchema)