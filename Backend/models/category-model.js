const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

CategorySchema.virtual("products", {
    ref: "ProductModel",
    localField: "_id",
    foreignField: "categoryId"
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;