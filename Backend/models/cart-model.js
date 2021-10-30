const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({

    userId: String,

    date: Date,

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