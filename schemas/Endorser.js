const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const EndorserSchema = new Schema({
    id: {
        type:Number,
        required:true
    },
    user: {
        type:Schema.ObjectId,
        ref:'User'
    }
},{timestamps: true, id: false})

module.exports = mongoose.model('Endorser', EndorserSchema)