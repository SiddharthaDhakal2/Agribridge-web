// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ImageWithFallback } from "../../components/ImageWithFallback";

afterEach(() => {
  cleanup();
});

describe("ImageWithFallback widget", () => {
  it("renders image when a valid src is provided", () => {
    render(<ImageWithFallback src="/demo.png" alt="Demo image" />);
    const image = screen.getByRole("img", { name: "Demo image" }) as HTMLImageElement;
    expect(image).not.toBeNull();
    expect(image.getAttribute("src")).toBe("/demo.png");
  });

  it("shows fallback when src is empty", () => {
    render(<ImageWithFallback src="" alt="No source" />);
    expect(screen.getByText("No image")).not.toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("switches to fallback when image load fails", () => {
    render(<ImageWithFallback src="/broken.png" alt="Broken image" />);
    const image = screen.getByRole("img", { name: "Broken image" });
    fireEvent.error(image);
    expect(screen.getByText("No image")).not.toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("keeps className on fallback container", () => {
    render(<ImageWithFallback src="" alt="Missing image" className="h-20 w-20 rounded" />);
    const fallbackText = screen.getByText("No image");
    const container = fallbackText.parentElement as HTMLElement;
    expect(container.className).toContain("h-20");
    expect(container.className).toContain("rounded");
  });

  it("keeps className on rendered img element", () => {
    render(<ImageWithFallback src="/ok.png" alt="OK image" className="object-cover rounded-md" />);
    const image = screen.getByRole("img", { name: "OK image" });
    expect(image.className).toContain("object-cover");
    expect(image.className).toContain("rounded-md");
  });
});
