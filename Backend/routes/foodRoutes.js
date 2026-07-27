const express = require("express");
const router = express.Router();

const {
    addFood,
    getAllFood,
    updateFood,
    deleteFood,
} = require("../controllers/foodController");

// Add Food
router.post("/add", addFood);

// Get All Food
router.get("/all", getAllFood);

// Update Food
router.put("/update/:id", updateFood);

// Delete Food
router.delete("/delete/:id", deleteFood);
module.exports = router;