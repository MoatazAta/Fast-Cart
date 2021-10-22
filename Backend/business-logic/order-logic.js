const OrderModel = require("../models/order-model");

function getAllOrdersAsync(){
    return OrderModel.find().populate("user cart").exec();
}

function addOrderAsync(order){
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    addOrderAsync
}