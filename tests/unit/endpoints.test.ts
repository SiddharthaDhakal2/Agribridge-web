import { describe, expect, it } from "vitest";
import { API } from "../../lib/api/endpoints";

const collectEndpointValues = (value: unknown): string[] => {
  if (typeof value === "string") {
    return [value];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.values(value).flatMap((child) => collectEndpointValues(child));
};

describe("API endpoint constants", () => {
  it("exposes the expected top-level endpoint groups", () => {
    expect(Object.keys(API)).toEqual(["AUTH", "PRODUCTS", "ORDERS", "PAYMENTS", "ADMIN"]);
  });

  it("uses the correct auth register route", () => {
    expect(API.AUTH.REGISTER).toBe("/api/auth/register");
  });

  it("uses the correct auth login route", () => {
    expect(API.AUTH.LOGIN).toBe("/api/auth/login");
  });

  it("uses the correct forgot password reset route", () => {
    expect(API.AUTH.FORGOT_PASSWORD_RESET).toBe("/api/auth/forgot-password/reset-password");
  });

  it("uses the correct products get-all route", () => {
    expect(API.PRODUCTS.GET_ALL).toBe("/api/products");
  });

  it("uses the correct products search route", () => {
    expect(API.PRODUCTS.SEARCH).toBe("/api/products/search");
  });

  it("uses the correct orders get-my-orders route", () => {
    expect(API.ORDERS.GET_MY_ORDERS).toBe("/api/orders/my-orders");
  });

  it("uses the correct khalti verify route", () => {
    expect(API.PAYMENTS.KHALTI_VERIFY).toBe("/api/payments/khalti/verify");
  });

  it("uses the correct admin users get-all route", () => {
    expect(API.ADMIN.USERS.GET_ALL).toBe("/api/admin/users");
  });

  it("ensures every endpoint constant starts with /api/", () => {
    const endpointValues = collectEndpointValues(API);
    expect(endpointValues.length).toBeGreaterThan(0);
    expect(endpointValues.every((route) => route.startsWith("/api/"))).toBe(true);
  });
});
