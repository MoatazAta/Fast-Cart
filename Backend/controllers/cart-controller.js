const express = require("express");
const logic = require("../business-logic/cart-logic");
const CartModel = require("../models/cart-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.use(verifyLoggedIn);

router.get("/carts", async (request, response) => {
    try {
        const carts = await logic.getAllCartsAsync();
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/carts/:userId", async (request, response) => {
    try {
        const _id = request.params.userId;
        const openCart = await logic.getOpenCartByUserIdAsync(_id, false);
        response.json(openCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/carts/last-cart/:userId", async (request, response) => {
    try {
        const _id = request.params.userId;
        const latestCart = await logic.getLatestCartAsync(_id);
        response.json(latestCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/carts", async (request, response) => {
    try {     
        const cart = new CartModel(request.body);
        const addedCart = await logic.addCartAsync(cart);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.patch("/carts/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const cart = new CartModel(request.body);
        cart.isPaid = true;
        const updatedCart = await logic.updateCartPaidAsync(cart);
        if (!updatedCart) return response.status(404).send(`_id ${_id} not found`);
        response.json(updatedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;