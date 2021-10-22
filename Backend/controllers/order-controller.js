const express = require("express");
const OrderModel = require("../models/order-model");
const logic = require("../business-logic/order-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const orders = await logic.getAllOrdersAsync();
        response.json(orders);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});


router.post("/", async (request, response) => {
    try {
        const order = new OrderModel(request.body);
        // Validate: 
        const errors = await product.validateSync();
        if(errors) return response.status(400).send(errors.message);

        const addedOrder = await logic.addOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
