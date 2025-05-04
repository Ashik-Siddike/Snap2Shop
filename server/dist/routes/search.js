"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const imageAnalysis_1 = __importDefault(require("../services/imageAnalysis"));
const productSearch_1 = __importDefault(require("../services/productSearch"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Configure multer for image upload
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Not an image! Please upload an image.'));
        }
    },
});
// @route   POST /api/search/image
// @desc    Analyze image and search for products
// @access  Private
router.post('/image', auth_1.protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        // Analyze image using Google Vision API
        const analysisResults = await imageAnalysis_1.default.analyzeImage(req.file.buffer);
        // Search for products using extracted keywords
        const products = await productSearch_1.default.searchProducts(analysisResults.keywords);
        res.json({
            success: true,
            data: {
                keywords: analysisResults.keywords,
                products,
                analysis: analysisResults.rawResults,
            },
        });
    }
    catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            message: 'Error processing image and searching for products',
        });
    }
});
// @route   GET /api/search/text
// @desc    Search products by text
// @access  Private
router.get('/text', auth_1.protect, async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Please provide a search query' });
        }
        const keywords = query.split(' ').filter(Boolean);
        const products = await productSearch_1.default.searchProducts(keywords);
        res.json({
            success: true,
            data: {
                keywords,
                products,
            },
        });
    }
    catch (error) {
        console.error('Text search error:', error);
        res.status(500).json({ message: 'Error searching for products' });
    }
});
exports.default = router;
