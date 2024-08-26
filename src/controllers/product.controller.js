import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(new ApiResponse(200, products));
    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to retrieve products"));
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.product_id });
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        res.status(200).json(new ApiResponse(200, product));
    } catch (error) {
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

const createProduct = async (req, res) => {
    const { productId, name, description, price, availability } = req.body;
    if (!productId || !name || !description || price === undefined) {
        throw new ApiError(400, "All fields are required");
    }
    if (price < 0) {
        throw new ApiError(400, "Price must be a positive value");
    }

    try {
        const product = new Product({ productId, name, description, price, availability });
        await product.save();
        res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to create product"));
    }
};

const updateProduct = async (req, res) => {
    const { productId, name, description, price, availability } = req.body;
    try {
        const product = await Product.findOneAndUpdate(
            { productId: req.params.product_id },
            { name, description, price, availability },
            { new: true, runValidators: true }
        );
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productId: req.params.product_id });
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
