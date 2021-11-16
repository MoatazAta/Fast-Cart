const ItemModel = require("../models/item-model");

function getAllItemsAsync(){ 
    return ItemModel.find().populate(" product ").exec();
}
 
function getItemsByCartIdAsync(cartId){
    return ItemModel.find({ cartId }).populate("product").exec();
}

function getItemByProductIdAsync(ProductId){
    return ItemModel.findOne({ ProductId }).populate("product").exec();
}

function addItemAsync(item){
    return item.save();
}

function deleteItemAsync(_id){
    return ItemModel.findByIdAndDelete(_id).exec();
}

function updateItemAsync(item){
    return ItemModel.findByIdAndUpdate(item._id, item, { returnOriginal: false }).exec();
}

module.exports = {
    getAllItemsAsync,
    getItemsByCartIdAsync,
    getItemByProductIdAsync,
    addItemAsync,
    deleteItemAsync,
    updateItemAsync
}