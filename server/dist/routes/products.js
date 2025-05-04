"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const Product_1 = __importDefault(require("../models/Product"));
const router = (0, express_1.Router)();
// Validation middleware
const productValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Product name is required'),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Product description is required'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('category').trim().notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
    (0, express_validator_1.body)('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];
// @route   POST /api/products
// @desc    Create a new product
// @access  Admin only
router.post('/', auth_1.protect, auth_1.adminOnly, productValidation, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, description, price, category, imageUrl, stock } = req.body;
        const product = await Product_1.default.create({
            name,
            description,
            price,
            category,
            imageUrl,
            stock
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
});
// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query;
        const query = {};
        // Filter by category
        if (category) {
            query.category = category;
        }
        // Search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        // Build sort object
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions = { [field]: order === 'desc' ? -1 : 1 };
        }
        else {
            sortOptions = { createdAt: -1 };
        }
        const products = await Product_1.default.find(query)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const total = await Product_1.default.countDocuments(query);
        res.json({
            products,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            total
        });
    }
    catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});
// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});
// @route   PUT /api/products/:id
// @desc    Update product
// @access  Admin only
router.put('/:id', auth_1.protect, auth_1.adminOnly, productValidation, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, description, price, category, imageUrl, stock } = req.body;
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.imageUrl = imageUrl;
        product.stock = stock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
});
// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Admin only
router.delete('/:id', auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    }
    catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});
exports.default = router;
