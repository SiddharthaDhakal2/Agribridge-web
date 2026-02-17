"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { handleLogout as serverHandleLogout } from "@/lib/actions/auth-actions";
import LogoutDialog from "@/components/LogoutDialog";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
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

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    startTransition(async () => {
      await serverHandleLogout();
      setIsLoggedIn(false);
      setShowLogoutDialog(false);
      router.push("/login");
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-8">

        {/* Logo - Left Side */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/agri_logo.png" 
            alt="Agribridge Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <span className="font-bold text-xl text-green-700">AgriBridge</span>
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
              <Link href="/cart" className="text-gray-700 font-medium hover:text-green-700 transition">
                Cart
              </Link>
              <Link href="/orders" className="text-gray-700 font-medium hover:text-green-700 transition">
                Orders
              </Link>
              <Link href="/profile" className="text-gray-700 font-medium hover:text-green-700 transition">
                Profile
              </Link>
              <button
                onClick={handleLogoutClick}
                disabled={isPending}
                className="text-gray-700 font-medium hover:text-green-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="text-gray-700 font-medium hover:text-green-700 transition">
                Signup
              </Link>
              <Link href="/login" className="text-gray-700 font-medium hover:text-green-700 transition">
                Login
              </Link>
            </>
          )}
        </nav>

      </div>
      
      <LogoutDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogoutConfirm}
        isPending={isPending}
      />
    </header>
  );
}
