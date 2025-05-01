import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

// Mock data for demonstration
const mockWishlist = [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    image: "https://example.com/iphone.jpg",
    currentPrice: 999.99,
    originalPrice: 1099.99,
    store: "Amazon",
    storeLogo: "https://example.com/amazon-logo.png",
    affiliateLink: "https://amazon.com/iphone13",
    priceDrop: true,
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    image: "https://example.com/samsung.jpg",
    currentPrice: 799.99,
    originalPrice: 799.99,
    store: "Best Buy",
    storeLogo: "https://example.com/bestbuy-logo.png",
    affiliateLink: "https://bestbuy.com/samsung",
    priceDrop: false,
  },
]

export default function Wishlist() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRemoveFromWishlist = async (productId: number) => {
    setIsLoading(true)
    try {
      // TODO: Implement remove from wishlist functionality
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove from wishlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {mockWishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button onClick={() => window.location.href = '/'}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockWishlist.map((product) => (
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
                {product.priceDrop && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    Price Drop!
                  </div>
                )}
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
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    {product.priceDrop && (
                      <span className="text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      disabled={isLoading}
                    >
                      Remove
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
      )}
    </div>
  )
} 