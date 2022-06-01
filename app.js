const express  = require("express")
const endorser = require('./schemas/Endorser.js')
const children = require('./schemas/Children.js')
const account  = require('./schemas/Account.js')
const app      = express()

const block    = require('./blockchain.js');

app.listen(3000)
app.get('/', (req, res) => res.sendFile('./index.html', {root: __dirname}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

const bdconnect  = 'mongodb+srv://jaguar:MTcxNj%40172039@cluster0.mielzun.mongodb.net/?retryWrites=true&w=majority'
const mongoose   = require('mongoose')

mongoose.connect(bdconnect,{ useNewUrlParser: true, useUniFiedTopology: true })
.then (res => console.log('connected'))
.catch(err => console.log(err))

app.post('/api/endorser/connect', async (req, res) => {   
    let endorder_one = await endorser.findOne({wallet:req.body.wallet});
    if(!endorder_one) {
        // create account in block chain
        endorder_one = await new endorser({
                
        })
    }
    res.json(response ? response : {})
})

app.post('/api/account/create', async (req, res) => {
    try {
        let response = await block.create(req.body.sender, req.body.children, req.body.limit);
        res.json(response)
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

app.post('/api/children/connect', (req, res) => {   
        console.log(req.body);
        res.json({})
})