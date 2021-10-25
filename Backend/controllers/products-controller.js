const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const ProductModel = require("../models/product-model");
const path = require("path");
const fs = require('fs');
const expressFileUpload = require("express-fileupload");
const router = express.Router();

router.get("/products", async(request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/categories", async(request, response) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        response.json(categories);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//GET One Product
router.get("/products/:id", async(request, response) => {
    try {
        const id = request.params.id;
        const product = await productsLogic.getOneProductAsync(id);
        if (!product) return response.status(404).send(`_id ${_id} not found`);
        response.json(product);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/products/products-per-category/:categoryId", async(request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//POST
router.post("/products", async(request, response) => {
    try {
        if (!request.files.image) {
            response.status(400).send("No image sent.");
            return;
        }
        const product = new ProductModel(request.body);
        // Validate: 
        const errors = await product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedProduct = await productsLogic.addProductAsync(product, request.files ? request.files.image : null);
        response.status(201).json(addedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/products/:id", async(request, response) => {
    try {
        const id = request.params.id;
        const deletedProduct = await productsLogic.deleteProductAsync(id);
        if (!deletedProduct) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});



// PUT one product: http://localhost:3001/api/products/some-id 
router.put("/products/:_id", async(request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const productToUpdate = new ProductModel(request.body);
        const product = productsLogic.getOneProductAsync(_id);
        currentImageName = product[0].imageName;

        // Validate: 
        const errors = await productToUpdate.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedProduct = await productsLogic.updateProductAsync(product, request.files ? request.files.imageName : null, currentImageName);
        if (!updatedProduct) return response.status(404).send(`_id ${_id} not found`);
        response.json(updatedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/products/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let fullPath = path.join(__dirname, "..", "images", name);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(__dirname, "..", "images", "ImageNotFound.png");
        }
        response.sendFile(fullPath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// // PATCH one product: http://localhost:3001/api/products/some-id 
// router.patch("/products/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         request.body._id = _id;
//         const product = new ProductModel(request.body);

//         // Validate: 
//         const errors = await product.validateSync();
//         if(errors) return response.status(400).send(errors.message);

//         const updatedProduct = await productsLogic.updateProductAsync(product);
//         if(!updatedProduct) return response.status(404).send(`_id ${_id} not found`);
//         response.json(updatedProduct);
//     }
//     catch(err) {
//         response.status(500).send(err.message);
//     }
// });

module.exports = router;