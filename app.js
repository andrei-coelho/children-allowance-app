const express  = require('express');
const app      = express();

(async () => {

    app.listen(3000)
    app.get('/', (req, res) => res.sendFile('./index.html', {root: __dirname}))


    require('./model/main.js')

    const account  = require('./model/AccountModel.js')
    //const user     = require('./model/UserModel.js')
    const block    = require('./model/blockchain.js')

    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/accounts', async (req, res) => {
        let all = await account.getAll(req.body.wallet)
        res.json(all)
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
            //console.log(account);
            
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