const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({

    userId:{
        type: String,
        require: [true, "user id required"]
    },
    date: {
        type: Date,
        required: [true, "cart date required"],
        default: Date.now
    }, 

    isPaid: {
        type: Boolean,
        default: false
    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id"
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;