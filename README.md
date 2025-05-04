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
📦 Project Name: Snap2Shop
🔍 Description:
Snap2Shop is a visual-product search and affiliate-based shopping assistant. Users can upload a screenshot or image of a product they are looking for, and the platform will find and compare the product across various e-commerce websites. The user can then view the best prices and make purchases through affiliate links. Additionally, users can save products to a Wishlist and get notified when discounts or price drops occur.

🎯 Core Features:
1. 🔎 Image-Based Product Search
Users upload a product screenshot or photo.

The image is processed using a vision API (like Google Vision).

The platform extracts relevant text/data to perform product search.

2. 🛍️ Multi-Site Price Comparison
Searches for the product across various platforms like:

Amazon

Flipkart

Daraz

AliExpress

Others (via API or web scraping)

Shows results in cards sorted by price (lowest first).

3. 🔗 Affiliate Link Integration
Every product card includes a “Buy Now” button.

Button redirects via your custom affiliate link for that platform.

4. ❤️ Wishlist with Discount Alerts
Logged-in users can save products to a Wishlist.

If a price drops or a sale is detected:

Notify the user via email and/or in-site notification.

Uses Firebase or backend scheduler for periodic checks.

5. 👤 User Authentication
Firebase-based Google Sign-In.

Wishlists and alerts are user-specific.

6. 📱 Responsive UI/UX
Clean, animated, and modern design using Tailwind CSS.

Fully responsive: Works great on mobile, tablet, desktop.

🧱 Tech Stack:
Layer	Technologies
Frontend	React (with TypeScript), Tailwind CSS, React Router
Backend	Node.js, Express.js, MongoDB or Firebase
Auth	Firebase Authentication
Image Parsing	Google Vision API
Scraping/API	Cheerio + Puppeteer (for scraping), or 3rd party APIs
Hosting	Vercel (Frontend), Render/Heroku/Cloud (Backend)
Notifications	Firebase Cloud Messaging + Email (e.g., SendGrid)

📄 Pages & UI Sections:
1. 🏠 Home Page
Navbar with logo, Home, Wishlist, and Login/Logout.

File/image upload section.

Product results section (cards with image, name, site, price).

“Buy Now” button with affiliate link.

2. ❤️ Wishlist Page
Grid of saved products.

Each product: image (or placeholder), title, price, site, remove button.

Filter: Price, Site, Availability.

3. 🔐 Login Page (Optional as a modal)
Google Sign-In button.

Auth state management.

🔔 Notification Flow:
User adds product to wishlist.

Backend checks (every 12/24 hours) for price drops via scraping/API.

If price drops, backend triggers:

Email using SendGrid or Nodemailer

In-site toast or push notification via Firebase

🧪 Testing & Mock Data:
Use mock products with placeholder images for UI testing.

Add dummy affiliate links for testing purposes.

Build with dummy wishlist items to test logic and layout.