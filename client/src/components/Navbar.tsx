import { Link } from 'react-router-dom'
import { Camera, Home, Heart, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-500">
            <Camera className="w-6 h-6" />
            <span className="text-xl font-semibold">Snap2Shop</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Search className="w-5 h-5" />
              <span>About</span>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 