const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id:Number,
    wallet:{
        type:String,
        required:true,
        unique:true
    }
}, {timestamps:true})

module.exports = mongoose.model('User', UserSchema)