const OrderModel = require("../models/order-model");

function getAllOrdersAsync(){
    return OrderModel.find().exec(); //.populate("user cart")
}

function getLatestOrderAsync(userId){
    return OrderModel.findOne({userId}).sort({date: 'desc'}).populate("user cart").exec();

}
function addOrderAsync(order){
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    getLatestOrderAsync,
    addOrderAsync
}