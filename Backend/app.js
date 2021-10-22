global.config = global.process.env.NODE_ENV === "production" ? require("./config-prod.json") : require("./config-dev.json");
require("./data-access-layer/dal"); // Connects Mongoose to MongoDB once
const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/products-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", productsController);

server.listen(3001, () => console.log("Listening..."));



