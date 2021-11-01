const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");


function isIdExistAsync(Id) {
    const user = UserModel.findOne({ Id }).exec();
    if (!user) return null;
}

function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.token = cryptoHelper.getNewToken(user);

    let newUser = user.save();
    // newUser = newUser.toObject();
    delete user.password;
    return newUser;
}

function loginAsync(email, password) {
    password = cryptoHelper.hash(password);
    const user = UserModel.findOne({ email, password }).exec();
    if (user.length === 0) return null;

    user.token = cryptoHelper.getNewToken(user);
    delete user.password;
    return user;
}

module.exports = {
    isIdExistAsync,
    registerAsync,
    loginAsync
};