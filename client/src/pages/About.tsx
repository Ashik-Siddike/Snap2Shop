import { motion } from 'framer-motion'
import { Camera, Search, Heart, Bell, Lock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About Snap2Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            We're on a mission to help consumers save money by finding the best deals
            across the web with just a single photo.
          </motion.p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Snap2Shop was born from a simple frustration: finding the best price for a product shouldn't be
              so time-consuming. Our founder, while shopping for a new laptop, spent hours comparing
              prices across different websites and knew there had to be a better way.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We built Snap2Shop to revolutionize the way people shop online. By leveraging the latest in
              image recognition technology and price comparison algorithms, we've created a tool that makes
              finding the best deals as easy as taking a screenshot.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How Snap2Shop Works</h2>
            <p className="text-gray-600">A simple, three-step process to save money on your purchases</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <Camera className="w-12 h-12 text-blue-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Take a Photo</h3>
              <p className="text-gray-600">
                Upload a screenshot or photo of any product you're interested in purchasing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <Search className="w-12 h-12 text-blue-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. AI Detection</h3>
              <p className="text-gray-600">
                Our AI identifies the product and searches for it across multiple online retailers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <Heart className="w-12 h-12 text-blue-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Compare & Save</h3>
              <p className="text-gray-600">
                View all available options, compare prices, and choose the best deal for you.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600">Everything you need to shop smarter</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-50 p-3 rounded-lg">
                <Camera className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Image Recognition</h3>
                <p className="text-gray-600">
                  Our advanced AI can identify products from screenshots, photos, or even partial images.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-50 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Price Comparison</h3>
                <p className="text-gray-600">
                  We compare prices across 30+ major retailers to ensure you're getting the best deal possible.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-50 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Price Drop Alerts</h3>
                <p className="text-gray-600">
                  Save products to your wishlist and receive notifications when prices drop.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-50 p-3 rounded-lg">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
                <p className="text-gray-600">
                  We value your privacy. Images are processed securely and never stored longer than necessary.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to start saving?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of smart shoppers who use Snap2Shop to find the best deals online.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-emerald-400 hover:from-blue-600 hover:to-emerald-500 text-white px-8"
            >
              Try Snap2Shop Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a
              href="mailto:contact@snap2shop.com"
              className="text-blue-500 hover:text-blue-600 text-lg font-medium"
            >
              contact@snap2shop.com
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 