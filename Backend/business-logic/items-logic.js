const dal = require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const ItemModel = require("../models/item-model");

function getAllItemsAsync(){
    return ItemModel.find().exec();
}

function getOneItemAsync(_id){
    return ItemModel.find({ _id }).exec();
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
    getOneItemAsync,
    addItemAsync,
    deleteItemAsync,
    updateItemAsync
}