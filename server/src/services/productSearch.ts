import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';
import type { CheerioAPI } from 'cheerio';

interface ProductInfo {
  title: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  store: string;
  rating?: number;
  reviews?: number;
}

class ProductSearchService {
  private async searchAmazon(keywords: string[]): Promise<ProductInfo[]> {
    const browser = await puppeteer.launch({ headless: true });
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
      
      const products: ProductInfo[] = [];
      
      $('.s-result-item[data-component-type="s-search-result"]').each((i: number, element) => {
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
    } finally {
      await browser.close();
    }
  }

  private async searchFlipkart(keywords: string[]): Promise<ProductInfo[]> {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      const searchQuery = keywords.join(' ');
      await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(searchQuery)}`);
      
      await page.waitForSelector('._1AtVbE');
      
      const content = await page.content();
      const $ = cheerio.load(content);
      
      const products: ProductInfo[] = [];
      
      $('._1AtVbE').each((i: number, element) => {
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
    } finally {
      await browser.close();
    }
  }

  async searchProducts(keywords: string[]): Promise<ProductInfo[]> {
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
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }
}

export default new ProductSearchService(); 