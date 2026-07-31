const Product = require("../models/Product");

// ======================================
// Add Product
// ======================================
exports.addProduct = async (req, res) => {

    try {

        const {
            module,
            productName,
            description,
            price,
            stock,
            image
        } = req.body;

        const existingProduct = await Product.findOne({
            module,
            productName
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists"
            });
        }

        const product = new Product({
            module,
            productName,
            description,
            price,
            stock,
            image
        });

        await product.save();

        return res.status(201).json({
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ======================================
// Get All Products
// ======================================
exports.getAllProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Products Retrieved Successfully",

            count: products.length,

            products

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ======================================
// Get Products By Module
// ======================================

exports.getProductsByModule = async (req, res) => {

    try {

        const { module } = req.params;

        const products = await Product.find({
            module: module
        }).sort({ createdAt: -1 });

        return res.status(200).json({

            message: "Products Retrieved Successfully",

            module,

            count: products.length,

            products

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ======================================
// Update Product
// ======================================

exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            message: "Product Updated Successfully",
            product
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ======================================
// Delete Product
// ======================================

exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        return res.status(200).json({
            message: "Product Deleted Successfully",
            product
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};