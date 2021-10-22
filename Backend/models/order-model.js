const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({

    userId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId,
    price: Number,
    city: {
        type: String,
        required: [true, "city required"]
    },
    street: {
        type: String,
        required: [true, "street required"]
    },
    date: {
        type: Date,
        required: [true, "Shipping Date required"]
    },
    creditCard:{
        type: Number,
        required: [true, "Credit Card Number required"]

    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});
 
CartSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;