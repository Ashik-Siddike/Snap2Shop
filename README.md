# Snap2Shop - Image-Based Product Price Comparison Tool

Snap2Shop is a powerful tool that helps users find the best prices for products across multiple e-commerce platforms. Simply upload a product screenshot, and our AI will detect the product and compare prices across various online stores.

## Features

- 📸 Image Upload & Preview
- 🤖 AI-based Product Detection
- 💰 Price Comparison across multiple platforms
- 🔗 Affiliate Integration
- 📋 Wishlist with Price Drop Alerts
- 🔐 User Authentication
- 📱 Responsive Design

## Tech Stack

- **Frontend**: React + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **OCR**: Google Cloud Vision API
- **Web Scraping**: Puppeteer
- **Authentication**: Firebase Auth

## Project Structure

```
snap2shop/
├── client/         → React Frontend
├── server/         → Backend API
├── .env            → API keys
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB
- Google Cloud Vision API key
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snap2shop.git
cd snap2shop
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:
   - Create `.env` file in the root directory
   - Add required API keys and configuration

5. Start the development servers:
```bash
# Terminal 1 - Frontend
cd client
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 