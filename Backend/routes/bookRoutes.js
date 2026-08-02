const express = require("express");
const router = express.Router();

const {

    addBook,
    getAllBooks,
    searchBook,
    getBooksByCategory,
    getAvailableBooks,
    sortBooksByPrice,
    paginateBooks,
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
// ======================================

router.get(
    "/all",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    getAllBooks
);

// ======================================
// Search Book
// Search by Title & Author
// ======================================

router.get(
    "/search",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    searchBook
);

// ======================================
// Filter Books By Category
// ======================================

router.get(
    "/category",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    getBooksByCategory
);

// ======================================
// Get Available Books
// ======================================

router.get(
    "/available",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    getAvailableBooks
);

// ======================================
// Sort Books By Price
// ======================================

router.get(
    "/sort",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    sortBooksByPrice
);

// ======================================
// Pagination
// ======================================

router.get(
    "/paginate",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    paginateBooks
);

// ======================================
// Update Book
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
// ======================================

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("superadmin", "departmentadmin"),
    allowDepartment("Book Depot"),
    deleteBook
);

module.exports = router;