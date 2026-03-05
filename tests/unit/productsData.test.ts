import { describe, expect, it } from "vitest";
import { products } from "../../app/products/data";

describe("app/products/data products", () => {
  it("contains exactly nine products", () => {
    expect(products).toHaveLength(9);
  });

  it("has unique product ids", () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ensures all quantities are zero or positive", () => {
    expect(products.every((product) => product.quantity >= 0)).toBe(true);
  });

  it("ensures all prices are positive", () => {
    expect(products.every((product) => product.price > 0)).toBe(true);
  });

  it("uses supported categories only", () => {
    const categories = new Set(["vegetables", "fruits", "grains"]);
    expect(products.every((product) => categories.has(product.category))).toBe(true);
  });

  it("uses supported stock status only", () => {
    const statuses = new Set(["in-stock", "low-stock", "out-of-stock"]);
    expect(products.every((product) => statuses.has(product.status))).toBe(true);
  });

  it("includes at least one low-stock product", () => {
    expect(products.some((product) => product.status === "low-stock")).toBe(true);
  });

  it("uses root-relative image paths", () => {
    expect(products.every((product) => product.image.startsWith("/"))).toBe(true);
  });
});
