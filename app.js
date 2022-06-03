const fs       = require('fs');
const express  = require("express")
const endorser = require('./schemas/Endorser.js')
const children = require('./schemas/Children.js')
const account  = require('./schemas/Account.js')
const user     = require('./schemas/User.js')
const app      = express()

const block    = require('./blockchain.js');

(async () => {
    
    app.listen(3000)
    app.get('/', (req, res) => res.sendFile('./index.html', {root: __dirname}))

    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }));

    try {
        let file = fs.readFileSync('./conf.json', {encoding:'utf8', flag:'r'});
        const bdconnect  = JSON.parse(file).mongodb;
        const mongoose   = require('mongoose')

        await mongoose.connect(bdconnect,{ useNewUrlParser: true, useUniFiedTopology: true })
        .then (res => console.log('mongodb connected'))
        .catch(err => console.log(err))
    } catch (err) {
        console.log(err);
    }

    block.contrato().events.Created()
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
        // remove event from local database
        console.log(event);
    })
    .on('error', console.error);

    app.post('/api/test', async (req, res) => {
        
        let wallet  = req.body.wallet;
        let usuario = await user.findOne({wallet:wallet}).exec();

        if(!usuario) {
            usuario = new user({
                wallet: wallet
            })
            usuario.save();
        }

        res.json(usuario);
    })

    app.post('/api/connect', async (req, res) => {   

        let wallet  = req.body.wallet;
        let usuario = await user.findOne({wallet:wallet}).exec();

        if(!usuario) {
            usuario = new user({
                wallet: wallet
            })
            usuario.save();
        }
        
        res.json(usuario);
    })

    app.post('/api/account/create', async (req, res) => {
        try {
            await block.create(req.body.endorser, req.body.children, req.body.limit);
            res.json({});
        } catch (error) {
            res.json({error: error})
        }
    })


    app.post('/api/account/deposit', async (req, res) => {
        try {
            let response = await block.deposit(req.body.sender, req.body.account, req.body.value);
            res.json(response)
        } catch(error){
            res.json(error)
        }
    })


    app.post('/api/account/withdraw', async (req, res) => {
        try {
            let response = await block.withdraw(req.body.sender, req.body.account, req.body.value);
            res.json(response)
        } catch(error){
            res.json(error)
        }
    })

})()