const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"]
    },
    password:{
        type: String,
        required: [true, "Password required"],
        
    }
}, { versionKey: false });

const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "credentials");

module.exports = CredentialsModel;
