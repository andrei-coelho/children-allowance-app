const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const AccountSchema = new Schema({
    id: {
        type:Number,
        required:true
    },
    endorser:{
        type:Schema.ObjectId,
        ref:'Endorser',
        required:true
    },
    children: {
        type:Schema.ObjectId,
        ref:'Children',
        required:true
    },
    limit: {
        type:Number,
        required:true
    },
    amount: Number
},{timestamps: true, id: false})

module.exports = mongoose.model('Account', AccountSchema)