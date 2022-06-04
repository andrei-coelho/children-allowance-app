const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const AccountSchema = new Schema({
    blockchain_id: {
        type:Number,
        required:true
    },
    endorser:{
        type:Schema.ObjectId,
        ref:'User',
        required:true
    },
    children: {
        type:Schema.ObjectId,
        ref:'User',
        required:true
    },
    limit: {
        type:Number,
        required:true
    },
    limit_used: Number,
    amount: Number,
    next_withdraw_in: Number // timestamp
},{timestamps: true})

module.exports = mongoose.model('Account', AccountSchema)