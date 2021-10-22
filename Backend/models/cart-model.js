const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({

    userId: mongoose.Schema.Types.ObjectId,
       
    date: Date,

    isPaid: Number

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id"
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;