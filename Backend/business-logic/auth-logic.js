const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");


function isIdExistAsync(Id) {
    const user = UserModel.find({ Id }).exec();
    if (user.length > 0) return null;
}
 
function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    const addedUser = user.save();
    delete addedUser.password;
    addedUser.token = cryptoHelper.getNewToken(user);
    return addedUser;
} 

function loginAsync(email , password) {
    // password = cryptoHelper.hash(password);
    const users = UserModel.findOne({ email, password}).exec();
    if (users.length === 0) return null;

    // user.token = cryptoHelper.getNewToken(user);
    
    return users;
}

module.exports = {
    isIdExistAsync,
    registerAsync,
    loginAsync
};