const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: [true, "ID required"]
    },
    firstName: {
        type: String,
        required: [true, "First name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [4, "Password must be minimum three chars."]
    },
    city: {
        type: String,
        required: [true, "City required"]
    },
    street: {
        type: String,
        required: [true, "Street required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { versionKey: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
