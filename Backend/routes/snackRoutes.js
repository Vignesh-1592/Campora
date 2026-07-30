const express = require("express");
const router = express.Router();

const {
    addSnack,
    getAllSnacks,
    updateSnack,
    deleteSnack
} = require("../controllers/snackController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
// Add Snack
router.post("/add", verifyToken, authorizeRoles("admin"), addSnack);

// Get All Snacks
router.get("/", verifyToken, getAllSnacks);

// Update Snack
router.put("/update/:id", verifyToken, authorizeRoles("admin"), updateSnack);

// Delete Snack
router.delete("/delete/:id", verifyToken, authorizeRoles("admin"), deleteSnack);

module.exports = router;