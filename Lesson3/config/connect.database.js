const mongoose = require('mongoose')

DB_URL = process.env.DB_URL

const connect = (()=>{
mongoose.connect(DB_URL)
.then(()=>{
    console.log('Database Connect Successful')
})
.catch((err)=>{
    console.log('Database Not Connect')
})
})

module.exports = {connect}