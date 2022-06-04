const Config     = require('./config.js');
const Web3       = require('web3')

const config     = new Config();
const blockchain = new Web3(new Web3.providers.WebsocketProvider(config.provider_address))
const contrato   = new blockchain.eth.Contract(config.ABI, config.contract_address);

function BlockChainExeption(message) {
    this.obj = message;
    this.name = "BlockChainExeption";
}

module.exports = {

	contrato: () => {
		return contrato;
	},

    create: async (sender, children, limit) => {
        let res = await contrato.methods.create(children, limit)
            .send({from:sender, gas:180000})
            .catch(err => {
                console.log(err)
                throw new BlockChainExeption(err)
            })
        return res;
    },

    deposit: async (sender, account, value )=> {
        let res = await contrato.methods.deposit(account)
        .send({from:sender, value:value})
        .catch(err => {
            throw new BlockChainExeption(err)
        })
        return res;
    },
    
    withdraw: async (sender, account, value) =>{
        let res = await contrato.methods.withdraw(account, value)
        .send({from:sender})
        .catch(err => {
            throw new BlockChainExeption(err)
        })
        return res;
    }

}