import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Camera, Search, CheckCircle2, Building2, Bell, Menu, X, Home as HomeIcon, Heart, Settings, HelpCircle } from 'lucide-react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
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
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/results')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-blue-600"
            >
              Snap2Shop
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Home
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Wishlist
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Settings
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Help
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-2">
                <motion.div
                  className="flex flex-col space-y-1"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                  initial="closed"
                  animate="open"
                >
                  <MenuItem icon={<HomeIcon className="w-5 h-5" />} text="Home" />
                  <MenuItem icon={<Heart className="w-5 h-5" />} text="Wishlist" />
                  <MenuItem icon={<Settings className="w-5 h-5" />} text="Settings" />
                  <MenuItem icon={<HelpCircle className="w-5 h-5" />} text="Help" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
          {/* Text Content - Now Second on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
              <span className="md:hidden">Find Best Deals</span>
              <span className="hidden md:block">
                Snap a product.
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Find the best deals.
                </span>
              </span>
            </h1>
            <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-lg">
              Upload a product image and our AI will instantly compare prices
              across multiple online stores to find you the best deal.
            </p>

            {/* Upload Form - Now Between Title and Features on Mobile */}
            <div className="md:hidden mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6 relative"
                >
                  <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Upload Product Image
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Take a photo or upload from gallery
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-white rounded-xl p-6 text-center shadow-sm"
                  >
                    {preview ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="space-y-4"
                      >
                        <motion.div 
                          className="relative aspect-video max-w-md mx-auto rounded-lg overflow-hidden shadow-lg ring-2 ring-blue-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <img
                            src={preview}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setSelectedImage(null)
                              setPreview(null)
                            }}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                          >
                            Remove Image
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload-mobile"
                        />
                        <label
                          htmlFor="image-upload-mobile"
                          className="block cursor-pointer"
                        >
                          <motion.div 
                            className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-4 shadow-xl"
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Camera className="w-10 h-10 text-white" />
                          </motion.div>
                          <motion.p 
                            className="text-base font-medium mb-2 text-blue-700"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            Tap to take photo or upload
                          </motion.p>
                          <motion.p 
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            JPG, PNG, WEBP supported
                          </motion.p>
                        </label>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white text-base font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedImage || isLoading}
                    >
                      {isLoading ? (
                        <motion.span 
                          className="flex items-center justify-center gap-2"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Search className="w-5 h-5 animate-spin" />
                          Processing...
                        </motion.span>
                      ) : (
                        <span>Find Best Deals</span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <CheckCircle2 className="text-blue-500 w-5 h-5" />
                </div>
                <span className="text-gray-700">Save up to 40% on your purchases</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Building2 className="text-blue-500 w-5 h-5" />
                </div>
                <span className="text-gray-700">Compare across 30+ major retailers</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Bell className="text-blue-500 w-5 h-5" />
                </div>
                <span className="text-gray-700">Get notified when prices drop</span>
              </div>
            </div>
          </motion.div>

          {/* Upload Form - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block w-full md:w-1/2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Upload Product Image</h2>
                <p className="text-gray-500 text-base">
                  Snap a screenshot of any product to find the best deals
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {preview ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-video max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null)
                          setPreview(null)
                        }}
                        className="text-red-500 hover:bg-red-50"
                      >
                        Remove Image
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload-desktop"
                      />
                      <label
                        htmlFor="image-upload-desktop"
                        className="cursor-pointer block"
                      >
                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                          <Upload className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-lg font-medium mb-2">
                          Drag & drop your image here or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Support for JPG, PNG, WEBP (max 5MB)
                        </p>
                      </label>
                    </div>
                  )}
                </motion.div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white text-lg font-medium"
                  disabled={!selectedImage || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Search className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span>Find Best Deals</span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-20 md:mt-32 mb-16 md:mb-24"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
          >
            Get the best deals in three simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <Camera className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Upload Image</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Take a screenshot or upload a picture of any product you want to buy.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group"
          >
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <Search className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">AI Recognition</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Our AI identifies the product and searches for it across multiple stores.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative group"
          >
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <Bell className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Get Best Deals</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Compare prices and get notified when prices drop below your target.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                          linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}

const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <motion.button
    variants={{
      open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 }
        }
      }
    }}
    whileHover={{ scale: 1.02, backgroundColor: "rgb(243 244 246)" }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-600 hover:text-blue-600 transition-colors"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </motion.button>
) 