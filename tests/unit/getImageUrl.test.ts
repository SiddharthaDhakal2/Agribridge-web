import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getImageUrl } from "../../lib/getImageUrl";

const originalPublicApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const clearPublicApiUrl = () => {
  delete process.env.NEXT_PUBLIC_API_BASE_URL;
};

const restorePublicApiUrl = () => {
  if (originalPublicApiUrl === undefined) {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    return;
  }

  process.env.NEXT_PUBLIC_API_BASE_URL = originalPublicApiUrl;
};

describe("getImageUrl", () => {
  beforeEach(() => {
    clearPublicApiUrl();
  });

  afterEach(() => {
    restorePublicApiUrl();
  });

  it("returns an empty string when path is empty", () => {
    expect(getImageUrl("")).toBe("");
  });

  it("keeps http URLs unchanged", () => {
    expect(getImageUrl("http://cdn.example.com/a.jpg")).toBe("http://cdn.example.com/a.jpg");
  });

  it("keeps https URLs unchanged", () => {
    expect(getImageUrl("https://cdn.example.com/a.jpg")).toBe("https://cdn.example.com/a.jpg");
  });

  it("keeps any string starting with http unchanged", () => {
    expect(getImageUrl("http-assets://custom-path")).toBe("http-assets://custom-path");
  });

  it("uses localhost default base URL when env is missing", () => {
    expect(getImageUrl("/uploads/p1.png")).toBe("http://localhost:5000/uploads/p1.png");
  });

  it("uses NEXT_PUBLIC_API_BASE_URL when provided", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getImageUrl("/uploads/p1.png")).toBe("https://api.example.com/uploads/p1.png");
  });

  it("preserves query string in relative paths", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getImageUrl("/uploads/p1.png?size=small")).toBe("https://api.example.com/uploads/p1.png?size=small");
  });

  it("preserves hash fragments in relative paths", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getImageUrl("/uploads/p1.png#thumb")).toBe("https://api.example.com/uploads/p1.png#thumb");
  });

  it("concatenates path even without a leading slash", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getImageUrl("uploads/p1.png")).toBe("https://api.example.comuploads/p1.png");
  });

  it("handles root slash path", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getImageUrl("/")).toBe("https://api.example.com/");
  });
});
