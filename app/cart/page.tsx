"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  supplier: string;
  image: string;
  pricePerKg: number;
  quantity: number;
}

interface DeliveryInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("cartItems");
      if (!raw) return [];
      const parsed = JSON.parse(raw) as {
        id: string;
        name: string;
        farm: string;
        image: string;
        price: number;
        unit: string;
        quantity: number;
      }[];

      return parsed.map((item) => ({
        id: item.id,
        name: item.name,
        supplier: item.farm,
        image: item.image,
        pricePerKg: item.price,
        quantity: item.quantity,
      }));
    } catch {
      return [];
    }
  });

  const persistCart = (items: CartItem[]) => {
    window.localStorage.setItem(
      "cartItems",
      JSON.stringify(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          farm: item.supplier,
          image: item.image,
          price: item.pricePerKg,
          unit: "kg",
          quantity: item.quantity,
        }))
      )
    );
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    const next = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(next);
    persistCart(next);
  };

  const removeItem = (id: string) => {
    const next = cartItems.filter((item) => item.id !== id);
    setCartItems(next);
    persistCart(next);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.pricePerKg * item.quantity,
      0
    );
  };

  const deliveryFee = 5.0;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load profile data when proceeding to checkout
  const handleProceedToCheckout = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        const profileData = JSON.parse(saved);
        setDeliveryInfo({
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
        });
      }
    }
    setShowCheckout(true);
  };

  const handleDeliveryInfoChange = (
    field: keyof DeliveryInfo,
    value: string
  ) => {
    setDeliveryInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitOrder = () => {
    if (
      deliveryInfo.name &&
      deliveryInfo.email &&
      deliveryInfo.phone &&
      deliveryInfo.address
    ) {
      alert(
        `Order placed successfully! \n\nDelivery to: ${deliveryInfo.name}`
      );
      setShowCheckout(false);
      setDeliveryInfo({ name: "", email: "", phone: "", address: "" });
    } else {
      alert("Please fill in all delivery information fields.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
                <Link
                  href="/products"
                  className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex gap-6 items-start group"
                >
                  {/* Product Image - Left */}
                  <div className="shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details - Center */}
                  <div className="grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.supplier}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Section - Right */}
                  <div className="flex flex-col items-end gap-4">
                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition"
                      aria-label="Delete item"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Prices */}
                    <div className="text-right pb-2 border-b border-gray-100">
                      <p className="text-gray-600 text-sm mb-2">
                        Rs {item.pricePerKg.toFixed(2)} / kg
                      </p>
                      <p className="text-green-600 font-bold text-lg">
                        Rs {(item.pricePerKg * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-black">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-black">
                    Rs {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-black">
                  <span className="font-medium">Delivery Fee</span>
                  <span className="font-bold text-black">
                    Rs {deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 pt-4 flex justify-between text-lg font-bold text-green-600">
                  <span>Total</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition mb-3 shadow-md hover:shadow-lg">
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="block w-full text-center bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Information
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Name Field - Read-only from profile */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Full Name <span className="text-gray-500 text-xs">(from profile)</span>
                </label>
                <input
                  type="text"
                  value={deliveryInfo.name}
                  readOnly
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Email Field - Read-only from profile */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address <span className="text-gray-500 text-xs">(from profile)</span>
                </label>
                <input
                  type="email"
                  value={deliveryInfo.email}
                  readOnly
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) =>
                    handleDeliveryInfoChange("phone", e.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 bg-gray-50 text-gray-600"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryInfo.address}
                  onChange={(e) =>
                    handleDeliveryInfoChange("address", e.target.value)
                  }
                  placeholder="Enter your delivery address"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-black font-medium">Subtotal</span>
                <span className="font-semibold text-black">Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-black font-medium">Delivery Fee</span>
                <span className="font-semibold text-black">Rs {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-green-600">Total</span>
                <span className="font-bold text-green-600 text-lg">
                  Rs {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-md hover:shadow-lg"
              >
                Place Order
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

