const express = require("express");
const logic = require("../business-logic/cart-logic");
const ItemModel = require("../models/item-model");
const CartModel = require("../models/cart-model"); 

const router = express.Router();
 
router.get("/carts", async (request, response) => {
    try {
        const carts = await logic.getAllCartsAsync(); 
        response.json(carts);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.get("/carts/:userId", async (request, response) => {
    try {
        const _id = request.params.userId; 
        const openCart = await logic.getOpenCartByUserIdAsync(_id,false);
        response.json(openCart); 
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.post("/carts", async (request, response) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        request.body.date = today;
        const cart = new CartModel(request.body);
        const addedCart = await logic.addCartAsync(cart);
        response.status(201).json(addedCart);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// PATCH
router.patch("/carts/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const cart = new CartModel(request.body);
        cart.isPaid = true;
        const updatedCart = await logic.updateCartPaidAsync(cart);
        if(!updatedCart) return response.status(404).send(`_id ${_id} not found`);
        response.json(updatedCart);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;