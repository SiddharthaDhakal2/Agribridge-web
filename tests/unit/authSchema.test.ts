import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "../../app/(auth)/schema";

describe("loginSchema", () => {
  it("accepts a valid login payload", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "secret123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Please enter a valid email")).toBe(true);
    }
  });

  it("rejects password shorter than 6 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "12345",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Password must be at least 6 characters")).toBe(true);
    }
  });

  it("rejects missing email", () => {
    const result = loginSchema.safeParse({
      password: "secret123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
    });

    expect(result.success).toBe(false);
  });

  it("strips unknown login fields", () => {
    const result = loginSchema.parse({
      email: "user@example.com",
      password: "secret123",
      role: "admin",
    } as unknown as {
      email: string;
      password: string;
      role: string;
    });

    expect(result).toEqual({
      email: "user@example.com",
      password: "secret123",
    });
  });
});

describe("registerSchema", () => {
  it("accepts a valid register payload", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "secret123",
      confirmPassword: "secret123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = registerSchema.safeParse({
      name: "J",
      email: "john@example.com",
      password: "secret123",
      confirmPassword: "secret123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Name must be at least 2 characters")).toBe(true);
    }
  });

  it("rejects invalid register email", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "invalid-email",
      password: "secret123",
      confirmPassword: "secret123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Please enter a valid email")).toBe(true);
    }
  });

  it("rejects register password shorter than 6 characters", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "12345",
      confirmPassword: "12345",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Password must be at least 6 characters")).toBe(true);
    }
  });

  it("rejects confirm password shorter than 6 characters", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "secret123",
      confirmPassword: "12345",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Confirm your password")).toBe(true);
    }
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "secret123",
      confirmPassword: "different123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.message === "Passwords do not match")).toBe(true);
      expect(result.error.issues.some((issue) => issue.path.join(".") === "confirmPassword")).toBe(true);
    }
  });
});
