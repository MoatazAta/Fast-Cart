const OrderModel = require("../models/order-model");

function getAllOrdersAsync() {
    return OrderModel.find().exec();
}

function getLatestOrderAsync(userId) {
    return OrderModel.findOne({ userId }).sort({ initDate: 'desc' }).populate("user cart").exec();
}

function addOrderAsync(order) {
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    getLatestOrderAsync,
    addOrderAsync
}