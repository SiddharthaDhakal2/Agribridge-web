import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../lib/api/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

import axiosInstance from "../../lib/api/axios";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
  updateProductAPI,
  updateStock,
} from "../../lib/api/products";

type AxiosMock = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

const mockedAxios = axiosInstance as unknown as AxiosMock;

describe("products API client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns products from getProducts()", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: [{ _id: "p1", name: "Tomato" }] },
    });

    const result = await getProducts();

    expect(result).toEqual([{ _id: "p1", name: "Tomato" }]);
  });

  it("calls /api/products in getProducts()", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/products");
  });

  it("calls getProductById() with product id route", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { _id: "p2", name: "Apple" } },
    });

    const result = await getProductById("p2");

    expect(result).toEqual({ _id: "p2", name: "Apple" });
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/products/p2");
  });

  it("passes query params in searchProducts()", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    await searchProducts("apple");

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/products/search", {
      params: { query: "apple" },
    });
  });

  it("calls category route in getProductsByCategory()", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    await getProductsByCategory("fruits");

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/products/category/fruits");
  });

  it("posts FormData with multipart headers in createProduct()", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { data: { _id: "p3", name: "Carrot" } },
    });
    const payload = new FormData();
    payload.append("name", "Carrot");

    const result = await createProduct(payload);

    expect(result).toEqual({ _id: "p3", name: "Carrot" });
    expect(mockedAxios.post).toHaveBeenCalledWith("/api/products", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  it("puts FormData with multipart headers in updateProductAPI()", async () => {
    mockedAxios.put.mockResolvedValueOnce({
      data: { data: { _id: "p4", name: "Spinach" } },
    });
    const payload = new FormData();
    payload.append("name", "Spinach");

    const result = await updateProductAPI("p4", payload);

    expect(result).toEqual({ _id: "p4", name: "Spinach" });
    expect(mockedAxios.put).toHaveBeenCalledWith("/api/products/p4", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  it("calls delete route in deleteProduct()", async () => {
    mockedAxios.delete.mockResolvedValueOnce({});

    await deleteProduct("p5");

    expect(mockedAxios.delete).toHaveBeenCalledWith("/api/products/p5");
  });

  it("calls stock patch route in updateStock()", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { data: { _id: "p6", quantity: 30 } },
    });

    const result = await updateStock("p6", 30);

    expect(result).toEqual({ _id: "p6", quantity: 30 });
    expect(mockedAxios.patch).toHaveBeenCalledWith("/api/products/p6/stock", {
      quantity: 30,
    });
  });

  it("uses API message for AxiosError responses", async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new AxiosError(
        "Request failed",
        undefined,
        undefined,
        undefined,
        { data: { message: "Products fetch exploded" } } as any
      )
    );

    await expect(getProducts()).rejects.toThrow("Products fetch exploded");
  });
});
