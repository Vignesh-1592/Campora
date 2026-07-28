const express = require("express");
const router = express.Router();

const {
    addBook,
    getAllBooks,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// Add Book
router.post("/add", addBook);

// Get All Books
router.get("/", getAllBooks);

// Update Book
router.put("/update/:id", updateBook);

// Delete Book
router.delete("/delete/:id", deleteBook);

module.exports = router;