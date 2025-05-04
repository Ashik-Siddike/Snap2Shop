"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image URL is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    ratings: [{
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true,
                trim: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    prices: [{
            store: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            lastUpdated: {
                type: Date,
                default: Date.now
            }
        }],
    tags: [{
            type: String,
            trim: true
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Update averageRating when a new rating is added
productSchema.pre('save', function (next) {
    if (this.ratings.length > 0) {
        this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
        this.numReviews = this.ratings.length;
    }
    this.updatedAt = new Date();
    next();
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
