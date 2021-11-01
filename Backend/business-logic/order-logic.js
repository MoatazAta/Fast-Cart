const OrderModel = require("../models/order-model");

function getAllOrdersAsync(){
    return OrderModel.find().exec(); //.populate("user cart")
}

function addOrderAsync(order){
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    addOrderAsync
}