"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const searchHistorySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    results: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product'
        }],
    searchDate: {
        type: Date,
        default: Date.now
    }
});
exports.default = (0, mongoose_1.model)('SearchHistory', searchHistorySchema);
