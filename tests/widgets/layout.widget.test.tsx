// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

afterEach(() => {
  cleanup();
});

describe("Layout widgets", () => {
  it("renders Card children", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).not.toBeNull();
  });

  it("applies base Card styles", () => {
    render(<Card>Styled card</Card>);
    const card = screen.getByText("Styled card") as HTMLElement;
    expect(card.className).toContain("bg-white");
    expect(card.className).toContain("rounded-lg");
  });

  it("merges custom Card className", () => {
    render(<Card className="card-custom">Card custom</Card>);
    const card = screen.getByText("Card custom") as HTMLElement;
    expect(card.className).toContain("card-custom");
  });

  it("applies base CardHeader styles", () => {
    render(<CardHeader>Header title</CardHeader>);
    const header = screen.getByText("Header title") as HTMLElement;
    expect(header.className).toContain("border-b");
    expect(header.className).toContain("px-6");
  });

  it("applies base CardContent styles", () => {
    render(<CardContent>Content area</CardContent>);
    const content = screen.getByText("Content area") as HTMLElement;
    expect(content.className).toContain("px-6");
    expect(content.className).toContain("py-4");
  });

  it("renders Badge content and custom className", () => {
    render(<Badge className="badge-custom">Delivered</Badge>);
    const badge = screen.getByText("Delivered");
    expect(badge.className).toContain("inline-flex");
    expect(badge.className).toContain("badge-custom");
  });
});
