const express = require("express");
const router = express.Router();

const {
    addSnack,
    getAllSnacks,
    updateSnack,
    deleteSnack
} = require("../controllers/snackController");

const verifyToken = require("../middleware/authMiddleware");

// Add Snack
router.post("/add", verifyToken, addSnack);

// Get All Snacks
router.get("/", verifyToken, getAllSnacks);

// Update Snack
router.put("/update/:id", verifyToken, updateSnack);

// Delete Snack
router.delete("/delete/:id", verifyToken, deleteSnack);

module.exports = router;