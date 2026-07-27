const express = require("express");
const router = express.Router();

const { addFood } = require("../controllers/foodController");

// Add Food
router.post("/add", addFood);

module.exports = router;