"use client";

import Link from "next/link";

export default function OrdersPage() {

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600">Track and manage all your orders</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-gray-600 mb-4 text-lg">You haven&apos;t placed any orders yet</p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Start Shopping
            </Link>
        </div>
      </div>
    </main>
  );
}
