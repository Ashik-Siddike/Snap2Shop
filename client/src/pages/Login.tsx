import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type Tab = 'login' | 'register'

export default function Login() {
  const [activeTab, setActiveTab] = useState<Tab>('register')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        title: activeTab === 'login' ? "Login successful" : "Account created",
        description: activeTab === 'login' 
          ? "Welcome back to Snap2Shop!" 
          : "Your account has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {activeTab === 'login' ? 'Welcome back' : 'Register'}
              </h2>
              <p className="text-gray-600">
                {activeTab === 'login' 
                  ? 'Sign in to your account to continue'
                  : 'Create a new account to start using Snap2Shop'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minLength={8}
                  />
                </div>
                {activeTab === 'register' && (
                  <p className="mt-2 text-sm text-gray-500">
                    Password must be at least 8 characters long.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white py-2 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : activeTab === 'login' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                  />
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                    alt="Facebook logo"
                  />
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 