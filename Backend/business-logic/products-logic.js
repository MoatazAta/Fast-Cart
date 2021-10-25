const dal = require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const path = require("path");
const uuid = require("uuid");
const { deleteFile } = require("../helpers/file-helper");

function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

function getAllCategoriesAsync() {
    return CategoryModel.find().exec();
}

function getProductsByCategoryAsync(categoryId) {
    return ProductModel.find({ categoryId }).exec();
}

function getOneProductAsync(productId) {
    return ProductModel.find({ productId }).exec();
}

async function addProductAsync(product, image) {
    if (!image) return null;
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const newImageName = uuid.v4() + extension;
    product.imageName = newImageName;
    const fullPath = path.join("./images/", product.imageName);
    await image.mv(fullPath);
    return product.save();
}

function deleteProductAsync(_id) {
    return ProductModel.findByIdAndDelete(_id).exec();
}


// Update existing product (partial or full):
async function updateProductAsync(product, newImage, currentImage) {
    if (!newImage) {
        product.imageName = currentImage;
    } else {
        let fullPath = path.join("./images/", currentImageName);
        deleteFile(fullPath);
        const extension = newImage.name.substr(newImage.name.lastIndexOf("."));
        const newFileName = uuid.v4() + extension;
        product.imageName = newFileName;
        fullPath = path.join("./images/", product.imageName);
        await newImage.mv(fullPath);
    }
    return ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    getProductsByCategoryAsync,
    addProductAsync,
    getAllCategoriesAsync,
    deleteProductAsync,
    updateProductAsync
}