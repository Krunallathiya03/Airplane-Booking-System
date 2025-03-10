const express = require("express");
const { getAnalyticsController } = require("../Controllers/adminController");


const route = express.Router();


route.get("/analytics",getAnalyticsController)

route.get("/reports")

module.exports = route;
