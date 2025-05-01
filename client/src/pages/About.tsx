export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Snap2Shop</h1>

        <div className="prose prose-gray dark:prose-invert">
          <p className="text-lg mb-6">
            Snap2Shop is your intelligent shopping companion that helps you find the best deals
            across multiple e-commerce platforms. Simply upload a product screenshot, and our
            AI-powered system will identify the product and compare prices for you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Upload a Screenshot</strong>
              <p className="text-muted-foreground">
                Take a screenshot of any product you're interested in and upload it to our platform.
              </p>
            </li>
            <li>
              <strong>AI-Powered Detection</strong>
              <p className="text-muted-foreground">
                Our advanced AI system analyzes the image to identify the product and its details.
              </p>
            </li>
            <li>
              <strong>Price Comparison</strong>
              <p className="text-muted-foreground">
                We search across multiple e-commerce platforms to find the best prices available.
              </p>
            </li>
            <li>
              <strong>Save and Track</strong>
              <p className="text-muted-foreground">
                Add products to your wishlist and get notified when prices drop.
              </p>
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            At Snap2Shop, we believe that finding the best deals shouldn't be a hassle. Our mission
            is to make shopping smarter and more efficient by leveraging cutting-edge technology
            to help you save time and money.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Snap2Shop?</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>Instant price comparisons across multiple platforms</li>
            <li>AI-powered product detection</li>
            <li>Price drop alerts for wishlist items</li>
            <li>User-friendly interface</li>
            <li>Secure and private</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 