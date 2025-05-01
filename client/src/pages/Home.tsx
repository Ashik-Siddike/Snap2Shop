import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { Upload, Camera, Search, CheckCircle2, Building2, Bell } from 'lucide-react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Snap a product.
              <br />
              <span className="text-blue-500">Find the best deals.</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Upload a product image and our AI will instantly compare prices
              across multiple online stores to find you the best deal.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-500 w-5 h-5" />
                <span>Save up to 40% on your purchases</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-blue-500 w-5 h-5" />
                <span>Compare across 30+ major retailers</span>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="text-blue-500 w-5 h-5" />
                <span>Get notified when prices drop</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Upload Product Image</h2>
              <p className="text-gray-500 text-sm">
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
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
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
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
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
          </motion.div>
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-32 mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Get the best deals in three simple steps
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 transform -translate-y-1/2" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <Camera className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Upload Image</h3>
                  <p className="text-gray-600 leading-relaxed">
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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <Search className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Recognition</h3>
                  <p className="text-gray-600 leading-relaxed">
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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl rotate-45 mx-auto transform transition-transform group-hover:rotate-[30deg] group-hover:scale-110">
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <CheckCircle2 className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold border-4 border-white">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Compare & Save</h3>
                  <p className="text-gray-600 leading-relaxed">
                    See all available deals and prices in one place and choose the best option.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 