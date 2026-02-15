"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-actions";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();

  const submit = async (values: LoginData) => {
    startTransition(async () => {
      const res = await handleLogin(values);

      if (res.success) {
        const role = res.data?.role;

        if (role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/home"); 
        }
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
          {...register("password")}
          placeholder="••••••"
        />
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="mt-6 h-11 w-full rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {isSubmitting || pending ? "Logging in..." : "Log in"}
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-green-700 hover:text-green-800 hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
}