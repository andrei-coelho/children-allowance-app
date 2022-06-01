const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const AccountSchema = new Schema({
    id: {
        type:Number,
        required:true
    },
    endorser_id: Number,
    children_id: Number,
    amount: Number,
    limit: Number
},{timestamps: true, id: false})

module.exports = mongoose.model('Account', AccountSchema)