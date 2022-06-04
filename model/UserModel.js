const UserModel    = require('../schemas/User.js');

module.exports = {

    async get(wallet){
        let user = await UserModel.findOne({ wallet: wallet }).exec()
        return user;
    },

    async getSafe(wallet){
        let user = await UserModel.findOne({ wallet: wallet }).exec()
        if(!user){
            user = new UserModel({wallet:wallet});
            userChildren.save();
        }
        return user;
    }

}