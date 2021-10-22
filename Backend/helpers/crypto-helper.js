const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(plainText) {

    if (!plainText) return null;

    // Hashing without salt: 
    return crypto.createHash("sha512").update(plainText).digest("hex");

}

function getNewToken(user) { // (payload will be the user object)
    const payload = {user};
    return jwt.sign( payload , global.config.jwtKey, { expiresIn: "30m" });
}

module.exports = {
    hash,
    getNewToken
};
