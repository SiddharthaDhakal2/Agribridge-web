"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "../(navigation)/Header";
import { products } from "./data";

const categories = [
	{ label: "All", value: "all" },
	{ label: "Vegetables", value: "vegetables" },
	{ label: "Fruits", value: "fruits" },
	{ label: "Grains", value: "grains" },
] as const;

export default function ProductsPage() {
	const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["value"]>("all");
	const [searchTerm, setSearchTerm] = useState("");

	const visibleProducts = useMemo(() => {
		const needle = searchTerm.trim().toLowerCase();
		return products.filter((product) => {
			const categoryMatch = activeCategory === "all" || product.category === activeCategory;
			const searchMatch =
				needle.length === 0 ||
				product.name.toLowerCase().includes(needle) ||
				product.farm.toLowerCase().includes(needle);
			return categoryMatch && searchMatch;
		});
	}, [activeCategory, searchTerm]);

	return (
		<>
			<Header />
			<main className="min-h-screen bg-linear-to-b from-[#f7f3ee] via-[#fbf8f3] to-[#efe9df] px-6 pb-10 pt-24 text-[#1f1f1f]">
				<div className="mx-auto w-full max-w-6xl">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif font-semibold">Product Catalog</h1>
				</div>

				<div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div className="relative w-full lg:max-w-xl">
						<span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6d6a63]">
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="M21 21l-4.3-4.3" />
							</svg>
						</span>
						<input
							type="search"
							placeholder="Search products..."
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							className="w-full rounded-full border border-[#e1dacf] bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-[#c5b9a3] focus:ring-2 focus:ring-[#e7dccb]"
						/>
					</div>

					<div className="flex flex-wrap gap-2">
						{categories.map((category) => {
							const isActive = activeCategory === category.value;
							return (
								<button
									key={category.value}
									type="button"
									onClick={() => setActiveCategory(category.value)}
									className={
										"rounded-full border px-4 py-2 text-sm font-medium transition " +
										(isActive
											? "border-[#245a3b] bg-[#245a3b] text-white shadow"
											: "border-[#e1dacf] bg-white text-[#3f3d37] hover:border-[#c5b9a3]")
									}
								>
									{category.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{visibleProducts.map((product) => (
						<Link key={product.id} href={`/products/${product.id}`} className="group">
							<article className="overflow-hidden rounded-2xl border border-[#efe6da] bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg">
							<div className="relative h-44 bg-[#f1ede6]">
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-cover transition duration-300 group-hover:scale-105"
								/>
							</div>
							<div className="flex flex-col gap-2 p-4">
								<div className="flex items-start justify-between gap-3">
									<div>
										<h3 className="text-base font-semibold text-[#2b2a27]">{product.name}</h3>
										<p className="text-xs text-[#7b756d]">{product.farm}</p>
									</div>
									<span className="rounded-full bg-[#1f6b45] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
										{product.status === "in-stock" ? "In Stock" : "Low Stock"}
									</span>
								</div>
								<div className="flex items-baseline gap-2">
									<span className="text-lg font-semibold text-[#1f6b45]">
										Rs {product.price.toFixed(2)}
									</span>
									<span className="text-xs text-[#7b756d]">/ {product.unit}</span>
								</div>
							</div>
							</article>
						</Link>
					))}
				</div>

				{visibleProducts.length === 0 && (
					<div className="mt-10 rounded-2xl border border-dashed border-[#d7cec1] bg-white/70 p-8 text-center text-sm text-[#6d6a63]">
						No products match your search. Try a different keyword.
					</div>
				)}
			</div>
			</main>
		</>
	);
}
