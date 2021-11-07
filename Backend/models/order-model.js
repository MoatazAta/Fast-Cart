const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({

    userId: {
        type: String,
        required: [true, "user ID required"],
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "cart ID required"],
    },
    price: {
        type: Number,
        required: [true, "price required"],
        min:[0,"price can't be negative"],

    },
    city: {
        type: String,
        minLength: [3, "city must be more than 3 chars"],
        required: [true, "city required"]
    },
    street: {
        type: String,
        minLength: [3, "street must be more than 3 chars"],

        required: [true, "street required"]
    },
    date: {
        type: Date,
        min: new Date(Date.now()).getDate() + 1,
        required: [true, "Shipping Date required"]
    },
    creditCard: {
        type: String,
        minLength: [4, "Credit Card Number must be 4 digits"],
        maxLength: [4, "Credit Card Number must be 4 digits"],
        required: [true, "Credit Card Number required"]

    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrderSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;