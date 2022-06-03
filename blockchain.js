const Web3  = require('web3')
const blockchain = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'))
const contrato   = new blockchain.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_children",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_limit",
				"type": "uint256"
			}
		],
		"name": "create",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_endorser",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_children",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_account",
				"type": "uint256"
			}
		],
		"name": "Created",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_account",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_account",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_account",
				"type": "uint256"
			}
		],
		"name": "accountAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_account",
				"type": "uint256"
			}
		],
		"name": "getLimitMonth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0x705B4d21147834B329d2918890368ec916959b9D");


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