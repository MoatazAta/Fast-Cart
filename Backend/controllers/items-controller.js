const express = require("express");
const logic = require("../business-logic/items-logic");
const ProductModel = require("../models/product-model"); 
const ItemModel = require("../models/item-model");
const router = express.Router();
 
router.get("/items", async (request, response) => {
    try {
        const items = await logic.getAllItemsAsync();
        response.json(items);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.get("/items/:productId", async (request, response) => {
    try {
        const _id = request.params.productId;
        const item = await logic.getItemByProductIdAsync(_id);
        response.json(item);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.get("/items/cart/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const items = await logic.getItemsByCartIdAsync(_id);
        response.json(items);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.post("/items", async (request, response) => {
    try {
        const item = new ItemModel(request.body);
        const addedItem = await logic.addItemAsync(item);
        response.status(201).json(addedItem);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.delete("/items/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const deletedItem = await logic.deleteItemAsync(_id);
        if(!deletedItem) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// PATCH
router.patch("/items/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const item = new ItemModel(request.body);

        const updatedItem = await logic.updateItemAsync(item);
        if(!updatedItem) return response.status(404).send(`_id ${_id} not found`);
        response.json(updatedItem);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});


router.delete("/items/:id", async(request, response) => {
    try {
        const id = request.params.id;
        const deletedItem = await logic.deleteItemAsync(id);
        if (!deletedItem) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;