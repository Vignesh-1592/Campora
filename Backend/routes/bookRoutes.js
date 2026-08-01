const express = require("express");
const router = express.Router();

const {

    addBook,
    getAllBooks,
    updateBook,
    deleteBook

} = require("../controllers/bookController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const allowDepartment = require("../middleware/departmentMiddleware");

// ======================================
// Add Book
// Super Administrator + Book Department Administrator
// ======================================

router.post(
    "/add",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    addBook
);

// ======================================
// Get All Books
// Super Administrator + Book Department Administrator
// ======================================

router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    getAllBooks
);

// ======================================
// Update Book
// Super Administrator + Book Department Administrator
// ======================================

router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    updateBook
);

// ======================================
// Delete Book
// Super Administrator + Book Department Administrator
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    deleteBook
);

module.exports = router;