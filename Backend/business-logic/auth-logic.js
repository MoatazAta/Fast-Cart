const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");


function validateIdAsync(id) {
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