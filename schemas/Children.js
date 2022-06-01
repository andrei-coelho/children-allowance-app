const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const ChildrenSchema =  new Schema({
    id: {
        type:Number,
        required:true
    },
    wallet: String,
    limit: Number,
    next_withdraw_in: Number // timestamp
},{timestamps: true, id: false})

module.exports = mongoose.model('Children', ChildrenSchema)