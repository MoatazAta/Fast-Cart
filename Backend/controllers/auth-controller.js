const express = require("express");
const logic = require("../business-logic/auth-logic");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");
const cryptoHelper = require("../helpers/crypto-helper");

const router = express.Router();

router.post("/login", async (request, response) => {
    try { 
        const credentials = new CredentialsModel(request.body);

        const errors = await credentials.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const loggedInUser = await logic.loginAsync(credentials.email, credentials.password);
        if (!loggedInUser) return response.status(401).send("Incorrect email or password!");
        loggedInUser.token = cryptoHelper.getNewToken(loggedInUser);

        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message); 
    }
});

router.post("/register", async (request, response) => {
    try {
        const userToAdd = new UserModel(request.body);
        
        const errors = await userToAdd.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedUser = await logic.registerAsync(userToAdd);
        addedUser.token = cryptoHelper.getNewToken(addedUser);

        response.status(201).json(addedUser)
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;