const Book = require("../models/Book");

// ===============================
// Add Book
// ===============================
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

        const book = new Book({
            title,
            author,
            category,
            price,
            image,
            available,
            stock,
        });

        await book.save();

        return res.status(201).json({
            message: "Book Added Successfully",
            book,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Get All Books
// ===============================
exports.getAllBooks = async (req, res) => {

    try {

        const books = await Book.find();

        return res.status(200).json({
            message: "Books Retrieved Successfully",
            count: books.length,
            books,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Update Book
// ===============================
exports.updateBook = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        return res.status(200).json({
            message: "Book Updated Successfully",
            book: updatedBook,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ===============================
// Delete Book
// ===============================
exports.deleteBook = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        return res.status(200).json({
            message: "Book Deleted Successfully",
            book: deletedBook,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};