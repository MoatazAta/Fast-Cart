const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: [true, "ID required"],
        match: [/(?=.*[0-9])(?=.{9,})/, "password must contain at least 6 letters and numbers."]

    }, 
    firstName: {
        type: String,
        required: [true, "First name required"],
        minLength: [2, "First name should be at least 2 letters"],
        maxLength: [50, "First name should be at most 50 letters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name required"],
        minLength: [2, "Last name should be at least 2 letters"],
        maxLength: [50, "Last name should be at most 50 letters"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        match: [/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/, 'Please fill a valid email address']
    },
    password: {  
        type: String,
        required: [true, "Password required"],
        minlength: [6, "password must contain at least 6 letters and numbers."],
        match: [/(?=.*[a-z])(?=.*[0-9])(?=.{6,})/, "password must contain at least 6 letters and numbers."]

    },
    city: {
        type: String,
        required: [true, "City required"],
        minlength: [2, "city must be minimum 2 chars."],
        maxLength: [50, "street should be at most 50 letters"],
    },
    street: {
        type: String,
        required: [true, "Street required"],
        minlength: [2, "street must be minimum 2 chars."],
        maxLength: [50, "city should be at most 50 letters"],

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: String

}, { versionKey: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
