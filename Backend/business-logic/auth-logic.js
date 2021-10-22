const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");


function isEmailExistAsync(email) {
    const email = UserModel.find({ email }).exec();
    if (email.length > 0) return null;
}

function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    const addedUser = user.save();
    delete addedUser.password;
    addedUser.token = cryptoHelper.getNewToken(user);
    return addedUser;
} 

function loginAsync(email , password) {
    password = cryptoHelper.hash(password);
    const user = CredentialsModel.find({ email, password }).exec();

    if (user.length === 0) return null;
    user = users[0];
    user.token = cryptoHelper.getNewToken(user);
    return user;
}

module.exports = {
    isEmailExistAsync,
    registerAsync,
    loginAsync
};