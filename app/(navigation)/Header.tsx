import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-green-700">
          AgriBridge
        </Link>

        {/* Center Nav */}
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/home" className="text-gray-700 font-medium hover:text-green-700 transition">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 font-medium hover:text-green-700 transition">
            About
          </Link>
          <Link href="/blogs" className="text-gray-700 font-medium hover:text-green-700 transition">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded transition">
            Log in
          </Link>

          <Link href="/register" className="px-4 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition">
            Sign up
          </Link>
        </div>

      </div>
    </header>
  );
}
