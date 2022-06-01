const mongoose = require('mongoose')
const Schema   = mongoose.Schema 

const EndorserSchema = new Schema({
    id: {
        type:Number,
        required:true
    },
    wallet: String
},{timestamps: true, id: false})

module.exports = mongoose.model('Endorser', EndorserSchema)