const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");


function validateIdAsync(email, id) {
    return UserModel.findOne({ id }).exec();
}

function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    let newUser = user.save();
    return newUser;
}

function loginAsync(email, password) {
    password = cryptoHelper.hash(password);
    const user = UserModel.findOne({ email, password }).exec();
    if (user.length === 0) return null;
    return user;
}

module.exports = {
    validateIdAsync,
    registerAsync,
    loginAsync
};