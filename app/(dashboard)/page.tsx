import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        <h1 className="mb-4 text-4xl font-bold md:text-6xl text-gray-900">
          Fresh Agriculture <span className="text-green-700">Products</span>
        </h1>

        <p className="mb-8 max-w-xl text-gray-600">
          Buy fresh, organic agricultural products directly from farmers. Quality guaranteed, competitive prices.
        </p>

        <div className="flex gap-4">
          <Link
            href="/home"
            className="rounded-md bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800 transition"
          >
            Browse Products
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-green-700 text-green-700 px-6 py-3 text-sm font-semibold hover:bg-green-50 transition"
          >
            Learn More
          </Link>
        </div>

      </div>
    </main>
  );
}
