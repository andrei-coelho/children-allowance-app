const block    = require('./blockchain.js')
const account  = require('./AccountModel.js') 
const events   = block.contrato().events;

events.Created()
    .on('data', function(event){
        account.create(
            event.returnValues._account, 
            event.returnValues._endorser, 
            event.returnValues._children, 
            event.returnValues._limit
        )
    })
    .on('error', console.error);

events.Transfer()
    .on('data', function(event){
        account.transfer(
            event.returnValues._endorser, 
            event.returnValues._account, 
            event.returnValues._to_account, 
            event.returnValues._value
        )
    })
    .on('error', console.error);

events.Deposit()
    .on('data', function(event){
        account.deposit(
            event.returnValues._account, 
            event.returnValues._value
        )
    })
    .on('error', console.error);

events.WithdrawChildren()
    .on('data', function(event){
        account.withdraw_by_children(  
            event.returnValues._account,
            event.returnValues._value
        )
    })
    .on('error', console.error);

events.WithdrawEndorser()
    .on('data', function(event){
        account.withdraw_by_endorser(
            event.returnValues._account,
            event.returnValues._value
        )
    })
    .on('error', console.error);