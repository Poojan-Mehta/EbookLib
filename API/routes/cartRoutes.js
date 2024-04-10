const express = require("express");
const { getUserCarts, AddToCart } = require("../controllers/cartController");
const checkAuthentication = require("../middleware/authMiddleware");

const Router = express.Router()

Router.get("", checkAuthentication, getUserCarts)
Router.post("", checkAuthentication, AddToCart)

module.exports = Router