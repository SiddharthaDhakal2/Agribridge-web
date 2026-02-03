export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full to-white">
      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="mb-4 text-4xl md:text-5xl font-bold text-gray-900">
              Direct from Farmers to Your Table
            </h1>

            <p className="mb-6 text-lg text-gray-600">
              Get fresh, high-quality agricultural products at the best prices. Support local farmers while enjoying premium quality produce.
            </p>

            <div className="flex gap-4">
              <button className="rounded bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800 transition">
                Shop Now
              </button>

              <button className="rounded border border-green-700 text-green-700 px-6 py-3 text-sm font-semibold hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-2">🌾</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fresh Produce</h3>
              <p className="text-sm text-gray-600">Direct from farms</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Fair rates always</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick & reliable</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-sm text-gray-600">100% guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
