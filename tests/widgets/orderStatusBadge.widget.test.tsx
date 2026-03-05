// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OrderStatusBadge } from "../../components/OrderStatusBadge";

afterEach(() => {
  cleanup();
});

describe("OrderStatusBadge widget", () => {
  it("renders pending status with yellow style", () => {
    render(<OrderStatusBadge status="pending" />);
    const badge = screen.getByText("Pending");
    expect(badge.className).toContain("bg-yellow-100");
  });

  it("renders processing status with blue style", () => {
    render(<OrderStatusBadge status="processing" />);
    const badge = screen.getByText("Processing");
    expect(badge.className).toContain("bg-blue-100");
  });

  it("renders shipped status with purple style", () => {
    render(<OrderStatusBadge status="shipped" />);
    const badge = screen.getByText("Shipped");
    expect(badge.className).toContain("bg-purple-100");
  });

  it("renders delivered status with green style", () => {
    render(<OrderStatusBadge status="delivered" />);
    const badge = screen.getByText("Delivered");
    expect(badge.className).toContain("bg-green-100");
  });

  it("renders cancelled status with red style", () => {
    render(<OrderStatusBadge status="cancelled" />);
    const badge = screen.getByText("Cancelled");
    expect(badge.className).toContain("bg-red-100");
  });
});
