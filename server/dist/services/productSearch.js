"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
class ProductSearchService {
    async searchAmazon(keywords) {
        const browser = await puppeteer_1.default.launch({ headless: true });
        try {
            const page = await browser.newPage();
            // Set user agent to avoid detection
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            const searchQuery = keywords.join(' ');
            await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`);
            // Wait for product grid
            await page.waitForSelector('.s-result-item');
            const content = await page.content();
            const $ = cheerio.load(content);
            const products = [];
            $('.s-result-item[data-component-type="s-search-result"]').each((i, element) => {
                if (i < 5) { // Get first 5 products
                    const title = $(element).find('h2 span').text().trim();
                    const priceWhole = $(element).find('.a-price-whole').first().text().trim();
                    const priceFraction = $(element).find('.a-price-fraction').first().text().trim();
                    const imageUrl = $(element).find('img.s-image').attr('src') || '';
                    const productUrl = 'https://www.amazon.com' + ($(element).find('a.a-link-normal').attr('href') || '');
                    const rating = parseFloat($(element).find('.a-icon-star-small').first().text()) || 0;
                    const reviews = parseInt($(element).find('span.a-size-base').first().text().replace(/[^0-9]/g, '')) || 0;
                    if (title && (priceWhole || priceFraction)) {
                        products.push({
                            title,
                            price: parseFloat(`${priceWhole}.${priceFraction}`) || 0,
                            imageUrl,
                            productUrl,
                            store: 'Amazon',
                            rating,
                            reviews
                        });
                    }
                }
            });
            return products;
        }
        finally {
            await browser.close();
        }
    }
    async searchFlipkart(keywords) {
        const browser = await puppeteer_1.default.launch({ headless: true });
        try {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            const searchQuery = keywords.join(' ');
            await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`);
            await page.waitForSelector('._1AtVbE');
            const content = await page.content();
            const $ = cheerio.load(content);
            const products = [];
            $('._1AtVbE').each((i, element) => {
                if (i < 5) { // Get first 5 products
                    const title = $(element).find('._4rR01T').text().trim();
                    const price = $(element).find('._30jeq3').text().replace('₹', '').replace(',', '').trim();
                    const imageUrl = $(element).find('img._396cs4').attr('src') || '';
                    const productUrl = 'https://www.flipkart.com' + ($(element).find('a._1fQZEK').attr('href') || '');
                    const rating = parseFloat($(element).find('._3LWZlK').first().text()) || 0;
                    const reviews = parseInt($(element).find('span._2_R_DZ').first().text().replace(/[^0-9]/g, '')) || 0;
                    if (title && price) {
                        products.push({
                            title,
                            price: parseFloat(price) || 0,
                            imageUrl,
                            productUrl,
                            store: 'Flipkart',
                            rating,
                            reviews
                        });
                    }
                }
            });
            return products;
        }
        finally {
            await browser.close();
        }
    }
    async searchProducts(keywords) {
        try {
            // Run searches in parallel
            const [amazonProducts, flipkartProducts] = await Promise.all([
                this.searchAmazon(keywords),
                this.searchFlipkart(keywords)
            ]);
            // Combine and sort by price
            const allProducts = [...amazonProducts, ...flipkartProducts]
                .sort((a, b) => a.price - b.price);
            return allProducts;
        }
        catch (error) {
            console.error('Error searching products:', error);
            throw new Error('Failed to search products');
        }
    }
}
exports.default = new ProductSearchService();
