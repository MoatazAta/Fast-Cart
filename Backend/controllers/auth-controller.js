const express = require("express");
const logic = require("../business-logic/auth-logic");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");

const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const credentials = new CredentialsModel(request.body);
        // Validate: 
        const errors = await credentials.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const loggedInUser = await logic.loginAsync(credentials.email, credentials.password);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password!");

        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register", async (request, response) => {
    try {
        const userToAdd = new UserModel(request.body);

        if (logic.isIdExistAsync(request.body._id)) return response.status(401).send("ID already exist");

        // Validate: 
        const errors = await credentials.validateSync();
        if (errors) return response.status(400).send(errors.message);


        // const isEmailExist = await logic.isEmailExistAsync(userToAdd.username);
        // if (isEmailExist === null) return response.status(400).send("email already used!");

        const addedUser = await logic.registerAsync(userToAdd);

        response.status(201).json(addedUser)
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;