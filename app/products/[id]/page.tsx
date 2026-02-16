"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../(navigation)/Header";
import { products } from "../data";

type CartItem = {
	id: string;
	name: string;
	farm: string;
	image: string;
	price: number;
	unit: string;
	quantity: number;
};

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");

const readCartItems = () => {
	if (typeof window === "undefined") return [] as CartItem[];
	try {
		const raw = window.localStorage.getItem("cartItems");
		if (!raw) return [];
		return JSON.parse(raw) as CartItem[];
	} catch {
		return [] as CartItem[];
	}
};

const writeCartItems = (items: CartItem[]) => {
	if (typeof window === "undefined") return;
	window.localStorage.setItem("cartItems", JSON.stringify(items));
};

export default function ProductDetailPage() {
	const params = useParams<{ id: string }>();
	const productId = decodeURIComponent(params?.id ?? "").trim().toLowerCase();

	const product = useMemo(
		() =>
			products.find(
				(item) => item.id.toLowerCase() === productId || slugify(item.name) === productId
			),
		[productId]
	);

	const [quantity, setQuantity] = useState(1);
	const [cartMessage, setCartMessage] = useState("");

	if (!product) {
		return (
			<>
				<Header />
				<main className="min-h-screen bg-linear-to-b from-[#f7f3ee] via-[#fbf8f3] to-[#efe9df] px-6 pb-12 pt-24 text-[#1f1f1f]">
					<div className="mx-auto w-full max-w-3xl">
						<div className="rounded-2xl border border-dashed border-[#d7cec1] bg-white/70 p-8 text-center">
							<p className="text-sm text-[#6d6a63]">Product not found.</p>
							<p className="mt-2 text-xs text-[#8a847a]">Requested ID: {params?.id ?? ""}</p>
							<Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1f6b45]">
								Back to catalog
							</Link>
						</div>
					</div>
				</main>
			</>
		);
	}

	const handleDecrease = () => {
		setQuantity((prev) => Math.max(1, prev - 1));
	};

	const handleIncrease = () => {
		setQuantity((prev) => Math.min(product.quantity, prev + 1));
	};

	const handleAddToCart = () => {
		const current = readCartItems();
		const existing = current.find((item) => item.id === product.id);

		if (existing) {
			existing.quantity = Math.min(product.quantity, existing.quantity + quantity);
			writeCartItems([...current]);
			setCartMessage("Updated quantity in your cart.");
			window.setTimeout(() => setCartMessage(""), 2000);
			return;
		}

		const nextItem: CartItem = {
			id: product.id,
			name: product.name,
			farm: product.farm,
			image: product.image,
			price: product.price,
			unit: product.unit,
			quantity,
		};

		writeCartItems([...current, nextItem]);
		setCartMessage("Added to cart.");
		window.setTimeout(() => setCartMessage(""), 2000);
	};

	return (
		<>
			<Header />
			<main className="min-h-screen bg-linear-to-b from-[#f7f3ee] via-[#fbf8f3] to-[#efe9df] px-6 pb-12 pt-24 text-[#1f1f1f]">
				<div className="mx-auto w-full max-w-6xl">
					<div className="mb-6">
						<Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-[#3f3d37]">
							<span className="text-lg">←</span>
							Back
						</Link>
					</div>

					<div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="overflow-hidden rounded-3xl bg-white shadow-lg">
							<div className="relative aspect-4/3 w-full">
								<Image src={product.image} alt={product.name} fill className="object-cover" />
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<span className="w-fit rounded-full border border-[#e1dacf] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#3f3d37]">
								{product.category}
							</span>
							<div>
								<h1 className="text-3xl font-serif font-semibold text-[#1f1f1f]">{product.name}</h1>
								<p className="text-sm text-[#7b756d]">by {product.farm}</p>
							</div>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-semibold text-[#1f6b45]">Rs {product.price.toFixed(2)}</span>
								<span className="text-sm text-[#7b756d]">per {product.unit}</span>
							</div>
							<p className="text-sm leading-relaxed text-[#4e4b46]">{product.description}</p>

							<span className="w-fit rounded-full bg-[#1f6b45] px-3 py-1 text-xs font-semibold text-white">
								{product.quantity} in stock
							</span>

							<div className="mt-2 flex flex-wrap items-center gap-3">
								<div className="flex items-center gap-4 rounded-lg border border-[#e1dacf] bg-white px-4 py-2 text-sm">
									<button type="button" onClick={handleDecrease} className="text-lg text-[#3f3d37]">
										-
									</button>
									<span className="min-w-6 text-center font-medium">{quantity}</span>
									<button type="button" onClick={handleIncrease} className="text-lg text-[#3f3d37]">
										+
									</button>
								</div>
								<button
									type="button"
									onClick={handleAddToCart}
									className="inline-flex items-center gap-2 rounded-lg bg-[#1f6b45] px-6 py-2.5 text-sm font-semibold text-white"
								>
									Add to Cart
								</button>
								{cartMessage ? (
									<span className="text-xs font-medium text-[#1f6b45]">{cartMessage}</span>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
