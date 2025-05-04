"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vision_1 = __importDefault(require("@google-cloud/vision"));
const path_1 = __importDefault(require("path"));
class ImageAnalysisService {
    constructor() {
        this.client = new vision_1.default.ImageAnnotatorClient({
            keyFilename: path_1.default.join(__dirname, '../../google-credentials.json')
        });
    }
    async analyzeImage(imageBuffer) {
        try {
            const [result] = await this.client.annotateImage({
                image: {
                    content: imageBuffer
                },
                features: [
                    { type: 'LABEL_DETECTION' },
                    { type: 'LOGO_DETECTION' },
                    { type: 'TEXT_DETECTION' },
                    { type: 'OBJECT_LOCALIZATION' }
                ]
            });
            const keywords = new Set();
            // Extract labels
            if (result.labelAnnotations) {
                result.labelAnnotations.forEach(label => {
                    if (label.description) {
                        keywords.add(label.description.toLowerCase());
                    }
                });
            }
            // Extract logos
            if (result.logoAnnotations) {
                result.logoAnnotations.forEach(logo => {
                    if (logo.description) {
                        keywords.add(logo.description.toLowerCase());
                    }
                });
            }
            // Extract text
            if (result.textAnnotations && result.textAnnotations[0]) {
                const fullText = result.textAnnotations[0].description || '';
                const words = fullText.split(/\s+/).slice(0, 10); // First 10 words
                words.forEach(word => keywords.add(word.toLowerCase()));
            }
            // Extract objects
            if (result.localizedObjectAnnotations) {
                result.localizedObjectAnnotations.forEach(object => {
                    if (object.name) {
                        keywords.add(object.name.toLowerCase());
                    }
                });
            }
            return {
                keywords: Array.from(keywords),
                rawResults: {
                    labels: result.labelAnnotations,
                    logos: result.logoAnnotations,
                    text: result.textAnnotations,
                    objects: result.localizedObjectAnnotations
                }
            };
        }
        catch (error) {
            console.error('Error analyzing image:', error);
            throw new Error('Failed to analyze image');
        }
    }
}
exports.default = new ImageAnalysisService();
