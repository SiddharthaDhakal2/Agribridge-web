"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking the role cookie
    const checkAuth = () => {
      const cookies = document.cookie;
      const hasRole = cookies.includes("role=");
      setIsLoggedIn(hasRole);
    };

    checkAuth();

    // Listen for storage changes
    window.addEventListener("storage", checkAuth);
    
    // Also listen for custom events that might be triggered on login
    window.addEventListener("authChange", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    // Clear cookies by setting them to empty
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-8">

        {/* Logo - Left Side */}
        <Link href="/" className="font-bold text-xl text-green-700">
          Agribridge
        </Link>

        {/* Navigation Links - Right Side */}
        <nav className="flex items-center gap-6">
          <Link href="/home" className="text-gray-700 font-medium hover:text-green-700 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 font-medium hover:text-green-700 transition">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/user/profile" className="text-gray-700 font-medium hover:text-green-700 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 font-medium hover:text-green-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-700 font-medium hover:text-green-700 transition">
              Login
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}
