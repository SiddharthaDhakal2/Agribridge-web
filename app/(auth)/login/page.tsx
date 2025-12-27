"use client";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                    AgriBridge
                </h1>
                <p className="text-sm text-gray-500 text-center mt-1">
                    Sign in to your account
                </p>

                <form className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <Link href="/dashboard">
                        <button
                            type="button"
                            className="w-full mt-2 rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
                        >
                            Login
                        </button>
                    </Link>

                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-green-600 font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

