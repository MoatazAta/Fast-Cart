const mongoose = require("mongoose");
  
const ItemSchema = mongoose.Schema({

    productId: mongoose.Schema.Types.ObjectId,

    quantity: Number,

    totalPrice: Number,

    cartId: mongoose.Schema.Types.ObjectId

 
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ItemSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

ItemSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

module.exports = ItemModel;