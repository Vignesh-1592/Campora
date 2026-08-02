const mongoose = require("mongoose");
const Book = require("../models/Book");

// ======================================
// Add Book
// ======================================
exports.addBook = async (req, res) => {

    try {

        const {
            title,
            author,
            category,
            price,
            image,
            available,
            stock
        } = req.body;

        // Required Field Validation
        if (!title || !author || !category || price == null) {

            return res.status(400).json({
                success: false,
                message: "Title, Author, Category and Price are required."
            });

        }

        // Duplicate Validation
        const existingBook = await Book.findOne({
            title: title.trim()
        });

        if (existingBook) {

            return res.status(409).json({
                success: false,
                message: "Book already exists."
            });

        }

        const book = await Book.create({
            title,
            author,
            category,
            price,
            image,
            available,
            stock
        });

        return res.status(201).json({
            success: true,
            message: "Book Added Successfully",
            book
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get All Books
// ======================================
exports.getAllBooks = async (req, res) => {

    try {

        const books = await Book.find();

        return res.status(200).json({
            success: true,
            message: "Books Retrieved Successfully",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Search Books
// Search by Title OR Author
// ======================================
exports.searchBook = async (req, res) => {

    try {

        const { title } = req.query;

        if (!title) {

            return res.status(400).json({
                success: false,
                message: "Book title is required."
            });

        }

        const books = await Book.find({

            $or: [

                {
                    title: {
                        $regex: title,
                        $options: "i"
                    }
                },

                {
                    author: {
                        $regex: title,
                        $options: "i"
                    }
                }

            ]

        });

        if (books.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No books found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Book Search Successful",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Filter Books By Category
// ======================================
exports.getBooksByCategory = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Category name is required."
            });

        }

        const books = await Book.find({
            category: name
        });

        if (books.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No books found in this category."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Books Retrieved Successfully",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get Available Books
// ======================================
exports.getAvailableBooks = async (req, res) => {

    try {

        const books = await Book.find({
            available: true
        });

        if (books.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No available books found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Available Books Retrieved Successfully",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Sort Books By Price
// ======================================
exports.sortBooksByPrice = async (req, res) => {

    try {

        const order = req.query.order === "desc" ? -1 : 1;

        const books = await Book.find().sort({
            price: order
        });

        return res.status(200).json({
            success: true,
            message: "Books Sorted Successfully",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Pagination
// ======================================
exports.paginateBooks = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalBooks = await Book.countDocuments();

        const books = await Book.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: "Books Retrieved Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
            count: books.length,
            books
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Update Book
// ======================================
exports.updateBook = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Book ID."
            });

        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Book Updated Successfully",
            book: updatedBook
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Delete Book
// ======================================
exports.deleteBook = async (req, res) => {

    try {

        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Book ID."
            });

        }

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {

            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Book Deleted Successfully",
            book: deletedBook
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};