import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

// Pages
import Home from '@/pages/Home'
import Wishlist from '@/pages/Wishlist'
import Results from '@/pages/Results'
import Login from '@/pages/Login'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
