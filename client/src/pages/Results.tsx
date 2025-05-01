import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    image: "https://example.com/iphone.jpg",
    price: 999.99,
    store: "Amazon",
    storeLogo: "https://example.com/amazon-logo.png",
    affiliateLink: "https://amazon.com/iphone13",
  },
  {
    id: 2,
    title: "iPhone 13 Pro Max",
    image: "https://example.com/iphone.jpg",
    price: 1099.99,
    store: "Best Buy",
    storeLogo: "https://example.com/bestbuy-logo.png",
    affiliateLink: "https://bestbuy.com/iphone13",
  },
  {
    id: 3,
    title: "iPhone 13 Pro Max",
    image: "https://example.com/iphone.jpg",
    price: 1049.99,
    store: "Walmart",
    storeLogo: "https://example.com/walmart-logo.png",
    affiliateLink: "https://walmart.com/iphone13",
  },
]

export default function Results() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToWishlist = async (productId: number) => {
    setIsLoading(true)
    try {
      // TODO: Implement wishlist functionality
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Added to wishlist",
        description: "You'll be notified when the price drops",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Price Comparison Results</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResults.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-square relative">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <div className="flex items-center space-x-2">
                <img
                  src={product.storeLogo}
                  alt={product.store}
                  className="w-6 h-6"
                />
                <span className="text-muted-foreground">{product.store}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToWishlist(product.id)}
                    disabled={isLoading}
                  >
                    Add to Wishlist
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(product.affiliateLink, '_blank')}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 