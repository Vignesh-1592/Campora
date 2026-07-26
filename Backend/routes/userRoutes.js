const express = require("express"); // Imports the Express library.
const router = express.Router(); // Creates a Router.

const { registerUser } = require("../controllers/userController");

router.post("/register", registerUser);

module.exports = router;