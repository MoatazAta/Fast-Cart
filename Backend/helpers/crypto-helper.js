const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { config } = require("process");

function hash(plainText) {
    if (!plainText) return null;
    return crypto.createHash("sha512").update(plainText).digest("hex");
}

function getNewToken(payload) {
    return jwt.sign({ payload }, global.config.jwtKey, { expiresIn: "24h" });
}

module.exports = {
    hash,
    getNewToken
};
