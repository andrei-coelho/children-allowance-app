const AccountModel = require('../schemas/Account.js');
const UserModel    = require('./UserModel.js')

async function getAccount(blockchain_account_id){
    return await AccountModel.findOne({blockchain_id:blockchain_account_id}).exec()
}

async function valueAccount(blockchain_account_id){
    let acc = await AccountModel.findOne({blockchain_id:blockchain_account_id}).exec();
    return acc.amount
}


module.exports = {

    async transfer(wallet, blockchain_account_id, to_blockchain_account_id, value){

    },

    async withdraw_by_endorser(blockchain_account_id, value){

        let valFinal = (await valueAccount(blockchain_account_id)) - value
        
        AccountModel.findOneAndUpdate(
            {blockchain_id:blockchain_account_id},
            {amount:valFinal}
        )
    },

    async withdraw_by_children(blockchain_account_id, value){
        
        let acc        = await getAccount(blockchain_account_id)
        let amount     = acc.amount - value
        let limit_used = acc.limit_used - value

        AccountModel.findOneAndUpdate(
            {blockchain_id:blockchain_account_id},
            {amount:amount, limit_used:limit_used}
        )

    },

    async withdraw_by_children_and_refresh(blockchain_account_id, value, timestamp){

    },

    async deposit(blockchain_account_id, value){
        
        let valFinal = (await valueAccount(blockchain_account_id)) + value
        
        AccountModel.findOneAndUpdate(
            {blockchain_id:blockchain_account_id},
            {amount:valFinal}
        )

    },

    async get(blockchain_account_id, wallet){
        // pega o limite - usado se for children 
        // o limite é o máximo se for endorser
    },

    async getAll(wallet){

        let user = await UserModel.get(wallet);
        if(!user) return [];

        let accounts = await AccountModel.find({$or:[{endorser:user._id}, {children:user._id}]}).exec();
        return accounts;
    },

    async create(id, endorser_wallet, children_wallet, limit){
        
        let userEndorser = await UserModel.getSafe(endorser_wallet);
        let userChildren = await UserModel.getSafe(children_wallet);

        new AccountModel({
            blockchain_id:id,
            endorser:userEndorser._id,
            children:userChildren._id,
            limit:limit
        }).save()

    }

}