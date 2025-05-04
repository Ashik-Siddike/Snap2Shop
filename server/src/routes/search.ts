import { Router, Request, Response } from 'express';
import multer, { FileFilterCallback, Multer } from 'multer';
import imageAnalysisService from '../services/imageAnalysis';
import productSearchService from '../services/productSearch';
import { protect } from '../middleware/auth';

// Extend Express Request type to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = Router();

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'));
    }
  },
});

// @route   POST /api/search/image
// @desc    Analyze image and search for products
// @access  Private
router.post(
  '/image',
  protect,
  upload.single('image'),
  async (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Please upload an image' });
      }

      // Analyze image using Google Vision API
      const analysisResults = await imageAnalysisService.analyzeImage(
        req.file.buffer
      );

      // Search for products using extracted keywords
      const products = await productSearchService.searchProducts(
        analysisResults.keywords
      );

      res.json({
        success: true,
        data: {
          keywords: analysisResults.keywords,
          products,
          analysis: analysisResults.rawResults,
        },
      });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        message: 'Error processing image and searching for products',
      });
    }
  }
);

// @route   GET /api/search/text
// @desc    Search products by text
// @access  Private
router.get('/text', protect, async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const keywords = (query as string).split(' ').filter(Boolean);
    const products = await productSearchService.searchProducts(keywords);

    res.json({
      success: true,
      data: {
        keywords,
        products,
      },
    });
  } catch (error) {
    console.error('Text search error:', error);
    res.status(500).json({ message: 'Error searching for products' });
  }
});

export default router; 