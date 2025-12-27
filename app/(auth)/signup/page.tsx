"use client";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Join AgriBridge
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Create your account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-700">Confirm Password</label>
            <input
              type="confirm password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}


