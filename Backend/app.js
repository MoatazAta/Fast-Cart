global.config = global.process.env.NODE_ENV === "production" ? require("./config-prod.json") : require("./config-dev.json");
require("./data-access-layer/dal"); // Connects Mongoose to MongoDB once
const express = require("express");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");

const productsController = require("./controllers/products-controller");
const authController = require("./controllers/auth-controller");
const itemsController = require("./controllers/items-controller");
const cartController = require("./controllers/cart-controller");
const orderController = require("./controllers/order-controller");

const server = express();

server.use(expressFileUpload());
server.use(cors());
server.use(express.json());

server.use("/api", productsController);
server.use("/api/auth", authController);
server.use("/api", itemsController);
server.use("/api", cartController);
server.use("/api/orders", orderController);

server.use("*", (req, res) => res.status(404).send("Route not found"));

server.listen(3001, () => console.log("Listening..."));



