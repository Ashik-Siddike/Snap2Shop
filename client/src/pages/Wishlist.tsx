import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Trash2, ExternalLink, AlertTriangle, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type Product = {
  id: string
  name: string
  image: string
  store: string
  currentPrice: number
  originalPrice: number
  lowestPrice: number
  priceDrop?: boolean
}

type Tab = 'all' | 'alerts' | 'drops'

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    store: '',
    currentPrice: '',
    originalPrice: '',
    lowestPrice: ''
  })
  const { toast } = useToast()

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
      image: 'https://i.imgur.com/uHqVmL9.jpg',
      store: 'Amazon',
      currentPrice: 298,
      originalPrice: 349.99,
      lowestPrice: 249.99,
      priceDrop: true
    },
    {
      id: '2',
      name: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds',
      image: 'https://i.imgur.com/JQZPn5p.jpg',
      store: 'Best Buy',
      currentPrice: 189.99,
      originalPrice: 249,
      lowestPrice: 189.99
    },
    {
      id: '3',
      name: 'Samsung Galaxy S23 Ultra 5G 256GB Unlocked Smartphone',
      image: 'https://i.imgur.com/8BUjLJh.jpg',
      store: 'Samsung',
      currentPrice: 1099.99,
      originalPrice: 1199.99,
      lowestPrice: 999.99,
      priceDrop: true
    }
  ]

  const filteredProducts = mockProducts.filter(product => {
    if (activeTab === 'alerts') return true
    if (activeTab === 'drops') return product.priceDrop
    return true
  })

  const handleRemoveFromWishlist = (productId: string) => {
    toast({
      title: "Product removed",
      description: "The product has been removed from your wishlist.",
    })
  }

  const calculateSavings = () => {
    return mockProducts.reduce((total, product) => {
      return total + (product.originalPrice - product.currentPrice)
    }, 0)
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to add the product
    toast({
      title: "Product added",
      description: "The product has been added to your wishlist.",
    })
    setIsAddModalOpen(false)
    setNewProduct({
      name: '',
      image: '',
      store: '',
      currentPrice: '',
      originalPrice: '',
      lowestPrice: ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Your Wishlist
              </h1>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </Button>
            </div>
            <p className="text-gray-600 mb-8">
              Track prices and get alerts when they drop
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <p className="text-gray-500 text-sm mb-2">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{mockProducts.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <p className="text-gray-500 text-sm mb-2">Price Drops</p>
                <p className="text-3xl font-bold text-green-500">
                  {mockProducts.filter(p => p.priceDrop).length}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <p className="text-gray-500 text-sm mb-2">Total Savings</p>
                <p className="text-3xl font-bold text-blue-500">
                  ${calculateSavings().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-4 relative font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Items
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-50 text-blue-500 rounded-full">
                {mockProducts.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`pb-4 px-4 relative font-medium transition-colors ${
                activeTab === 'alerts'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Price Alerts
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-50 text-blue-500 rounded-full">
                {mockProducts.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('drops')}
              className={`pb-4 px-4 relative font-medium transition-colors ${
                activeTab === 'drops'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Price Drops
              <span className="ml-2 px-2 py-0.5 text-xs bg-green-50 text-green-500 rounded-full">
                {mockProducts.filter(p => p.priceDrop).length}
              </span>
            </button>
          </div>

          {/* Products Table */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Store
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Current Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Lowest Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="group hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                            />
                            <div>
                              <p className="font-medium text-gray-900 group-hover:text-blue-500 transition-colors">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {product.store}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              ${product.currentPrice}
                            </p>
                            {product.priceDrop && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">
                                  Price Dropped
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            ${product.lowestPrice}
                          </p>
                          {product.currentPrice > product.lowestPrice && (
                            <p className="text-xs text-gray-500">
                              ${(product.currentPrice - product.lowestPrice).toFixed(2)} above lowest
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                            >
                              <Bell className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFromWishlist(product.id)}
                              className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <AlertTriangle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'drops' 
                    ? "No price drops at the moment. We'll notify you when prices change!"
                    : "Start adding items to your wishlist to track their prices"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Product Modal */}
          <AnimatePresence>
            {isAddModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4"
                >
                  <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Add New Product</h2>
                    <button
                      onClick={() => setIsAddModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store
                      </label>
                      <input
                        type="text"
                        value={newProduct.store}
                        onChange={(e) => setNewProduct({ ...newProduct, store: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.currentPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, currentPrice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Original Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.originalPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lowest Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.lowestPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, lowestPrice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Add Product
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
} 