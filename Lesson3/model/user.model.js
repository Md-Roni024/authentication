const mongoose = require('mongoose')
// const encrypt = require('mongoose-encryption')
// require('dotenv').config()
// const ENC_KEY = process.env.ENC_KEY

const UserScema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

// UserScema.plugin(encrypt, {
//     secret: ENC_KEY,
//     encryptedFields: ['password']
//   });

module.exports = mongoose.model('users',UserScema)