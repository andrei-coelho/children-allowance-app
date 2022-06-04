const Config   = require('./config.js');

(async () =>{

    let config = new Config();
    const mongoose   = require('mongoose')

    await mongoose.connect(config.mongodb,{ useNewUrlParser: true, useUniFiedTopology: true })
    .then (res => console.log('mongodb connected'))
    .catch(err => console.log(err))

    require('./events.js')
    
})()