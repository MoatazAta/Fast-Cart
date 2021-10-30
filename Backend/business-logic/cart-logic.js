const dal = require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const ItemModel = require("../models/item-model");
const CartModel = require("../models/cart-model");

function getAllCartsAsync() {
    return CartModel.find().exec();
}

function getOpenCartByUserIdAsync(userId, isPaid) {
    return CartModel.findOne({ userId, isPaid }).exec();
}

function getLatestCartByUserIdAsync(userId, isPaid) {
    return CartModel.find({ userId, isPaid }).exec();
}

function addCartAsync(cart) {
    return cart.save();
}

function updateCartPaidAsync(cart) {
    return CartModel.findByIdAndUpdate(cart._id, cart, { returnOriginal: false }).exec();
}

function deleteItemAsync(_id){
    return ProductModel.findByIdAndDelete(_id).exec();
}
module.exports = {
    getAllCartsAsync,
    getOpenCartByUserIdAsync,
    getLatestCartByUserIdAsync,
    addCartAsync,
    updateCartPaidAsync,
    deleteItemAsync
}