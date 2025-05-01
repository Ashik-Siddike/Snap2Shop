import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Trash2, ExternalLink, AlertTriangle, Plus, X, BellRing, Upload, Camera, ArrowRight, Store, DollarSign, Target } from 'lucide-react'
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
  targetPrice?: number
  priceDrop?: boolean
  priceAlert?: boolean
}

type Tab = 'all' | 'alerts' | 'drops'

type AddProductStep = 'upload' | 'compare' | 'target'

type PriceComparison = {
  store: string
  price: number
  storeLogo: string
  productUrl: string
}

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPriceAlertModalOpen, setIsPriceAlertModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentStep, setCurrentStep] = useState<AddProductStep>('upload')
  const [isProcessing, setIsProcessing] = useState(false)
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [selectedStore, setSelectedStore] = useState<PriceComparison | null>(null)
  const [targetPrice, setTargetPrice] = useState<string>('')
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    store: '',
    currentPrice: '',
    originalPrice: '',
    lowestPrice: '',
    targetPrice: ''
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
      targetPrice: 275,
      priceDrop: true,
      priceAlert: true
    },
    {
      id: '2',
      name: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds',
      image: 'https://i.imgur.com/JQZPn5p.jpg',
      store: 'Best Buy',
      currentPrice: 189.99,
      originalPrice: 249,
      lowestPrice: 189.99,
      targetPrice: 180
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

  const mockPriceComparisons: PriceComparison[] = [
    {
      store: 'Amazon',
      price: 298.00,
      storeLogo: 'https://i.imgur.com/uHqVmL9.jpg',
      productUrl: 'https://amazon.com'
    },
    {
      store: 'Best Buy',
      price: 319.99,
      storeLogo: 'https://i.imgur.com/JQZPn5p.jpg',
      productUrl: 'https://bestbuy.com'
    },
    {
      store: 'Walmart',
      price: 309.99,
      storeLogo: 'https://i.imgur.com/8BUjLJh.jpg',
      productUrl: 'https://walmart.com'
    }
  ]

  const filteredProducts = mockProducts.filter(product => {
    if (activeTab === 'alerts') return product.priceAlert
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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setNewProduct(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setNewProduct(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a product image to continue",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate API call to process image
      await new Promise(resolve => setTimeout(resolve, 2000))
      setPriceComparisons(mockPriceComparisons)
      setCurrentStep('compare')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStoreSelect = (store: PriceComparison) => {
    setSelectedStore(store)
    setCurrentStep('target')
    setTargetPrice(store.price.toString())
  }

  const handleAddToWishlist = () => {
    if (!selectedStore || !targetPrice) return

    // Here you would typically make an API call to add the product
    toast({
      title: "Product added",
      description: "The product has been added to your wishlist with price alert.",
    })
    
    setIsAddModalOpen(false)
    resetAddProductForm()
  }

  const resetAddProductForm = () => {
    setSelectedImage(null)
    setPreview(null)
    setCurrentStep('upload')
    setIsProcessing(false)
    setPriceComparisons([])
    setSelectedStore(null)
    setTargetPrice('')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upload Product Image</h3>
              <p className="text-gray-500 mt-2">
                Upload a screenshot of the product you want to track
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative border-2 border-dashed rounded-2xl transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="p-8">
                {preview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-video max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null)
                          setPreview(null)
                        }}
                        className="text-red-500 hover:bg-red-50 border-red-200"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="product-image-upload"
                    />
                    <label
                      htmlFor="product-image-upload"
                      className="cursor-pointer block"
                    >
                      <motion.div 
                        className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-4 shadow-sm"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Upload className="w-10 h-10 text-blue-500" />
                      </motion.div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-sm text-gray-500">
                        Support for JPG, PNG, WEBP (max 5MB)
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )

      case 'compare':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Compare Prices</h3>
              <p className="text-gray-500 mt-2">
                Select the store with the best price for your product
              </p>
            </motion.div>

            <div className="grid gap-4">
              {priceComparisons.map((comparison, index) => (
                <motion.div
                  key={comparison.store}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleStoreSelect(comparison)}
                    className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <img
                            src={comparison.storeLogo}
                            alt={comparison.store}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900 group-hover:text-blue-500">
                            {comparison.store}
                          </p>
                          <p className="text-sm text-gray-500">
                            Visit store
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${comparison.price}
                        </p>
                        {index === 0 && (
                          <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
                            Best Price
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'target':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Set Target Price</h3>
              <p className="text-gray-500 mt-2">
                We'll notify you when the price drops below your target
              </p>
            </motion.div>

            {selectedStore && (
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                      <img
                        src={selectedStore.storeLogo}
                        alt={selectedStore.store}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedStore.store}</p>
                      <p className="text-sm text-gray-500">Current Price: ${selectedStore.price}</p>
                    </div>
                  </div>
                  <a
                    href={selectedStore.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Enter your target price"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    <p>Suggested: ${(selectedStore.price * 0.9).toFixed(2)} (10% off current price)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  const renderStepButtons = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                resetAddProductForm()
              }}
              className="px-6 py-2.5 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={!selectedImage || isProcessing}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25"
            >
              {isProcessing ? (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Continue
                </>
              )}
            </Button>
          </>
        )

      case 'compare':
        return (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('upload')}
              className="px-6 py-2.5 rounded-xl hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="button"
              disabled={true}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25 opacity-50"
            >
              Select a Store
            </Button>
          </>
        )

      case 'target':
        return (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('compare')}
              className="px-6 py-2.5 rounded-xl hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleAddToWishlist}
              disabled={!targetPrice}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25"
            >
              Add to Wishlist
            </Button>
          </>
        )
    }
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
            Track prices and get alerts when they drop below your target
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-2">Total Items</p>
              <p className="text-3xl font-bold text-gray-900">{mockProducts.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-2">Price Alerts</p>
              <p className="text-3xl font-bold text-blue-500">
                {mockProducts.filter(p => p.priceAlert).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-2">Total Savings</p>
              <p className="text-3xl font-bold text-green-500">
                ${calculateSavings().toFixed(2)}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-8">
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
                {mockProducts.filter(p => p.priceAlert).length}
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
                        Target Price
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
                              {product.priceAlert && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                                  <BellRing className="w-3 h-3" />
                                  Price Alert Set
                                </span>
                              )}
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
                          {product.targetPrice ? (
                            <div>
                              <p className="font-medium text-gray-900">
                                ${product.targetPrice}
                              </p>
                              {product.currentPrice > product.targetPrice && (
                                <p className="text-xs text-gray-500">
                                  ${(product.currentPrice - product.targetPrice).toFixed(2)} above target
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not set</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSetPriceAlert(product)}
                              className={`hover:bg-blue-50 ${
                                product.priceAlert ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                              }`}
                            >
                              {product.priceAlert ? (
                                <BellRing className="w-5 h-5" />
                              ) : (
                                <Bell className="w-5 h-5" />
                              )}
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
                    : activeTab === 'alerts'
                    ? "No price alerts set. Add alerts to track specific prices!"
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4 relative flex flex-col max-h-[90vh]"
                >
                  {/* Header - Fixed */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-white">Add to Wishlist</h2>
                          <p className="text-white/80 text-sm mt-1">Step {currentStep === 'upload' ? '1' : currentStep === 'compare' ? '2' : '3'} of 3</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddModalOpen(false)
                          resetAddProductForm()
                        }}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Content - Scrollable */}
                  <div className="overflow-y-auto flex-1 p-6">
                    <AnimatePresence mode="wait">
                      {renderStepContent()}
                    </AnimatePresence>
                  </div>

                  {/* Footer - Fixed */}
                  <div className="border-t bg-white p-6 rounded-b-2xl">
                    <div className="flex justify-end gap-3">
                      {renderStepButtons()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price Alert Modal */}
          <AnimatePresence>
            {isPriceAlertModalOpen && selectedProduct && (
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
                    <h2 className="text-xl font-semibold">Set Price Alert</h2>
                    <button
                      onClick={() => {
                        setIsPriceAlertModalOpen(false)
                        setSelectedProduct(null)
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdatePriceAlert} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product
                      </label>
                      <p className="text-gray-900">{selectedProduct.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Price
                      </label>
                      <p className="text-gray-900">${selectedProduct.currentPrice}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="targetPrice"
                        defaultValue={selectedProduct.targetPrice}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        We'll notify you when the price drops below this amount
                      </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsPriceAlertModalOpen(false)
                          setSelectedProduct(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Set Alert
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