// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input, Label } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

afterEach(() => {
  cleanup();
});

describe("Form control widgets", () => {
  it("renders input with provided type and placeholder", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.type).toBe("email");
  });

  it("uses default input classes", () => {
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText("Name");
    expect(input.className).toContain("w-full");
    expect(input.className).toContain("rounded-lg");
  });

  it("merges custom input className", () => {
    render(<Input placeholder="City" className="custom-input" />);
    const input = screen.getByPlaceholderText("City");
    expect(input.className).toContain("custom-input");
  });

  it("forwards input onChange handler", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Phone" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Phone");
    fireEvent.change(input, { target: { value: "12345" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders label text and htmlFor attribute", () => {
    render(<Label htmlFor="email">Email Address</Label>);
    const label = screen.getByText("Email Address");
    expect(label).not.toBeNull();
    expect(label.getAttribute("for")).toBe("email");
  });

  it("merges custom label className", () => {
    render(<Label className="custom-label">Field</Label>);
    const label = screen.getByText("Field");
    expect(label.className).toContain("custom-label");
  });

  it("renders textarea with default classes", () => {
    render(<Textarea placeholder="Message" />);
    const textarea = screen.getByPlaceholderText("Message");
    expect(textarea.className).toContain("resize-none");
    expect(textarea.className).toContain("rounded-lg");
  });

  it("forwards textarea onChange handler", () => {
    const handleChange = vi.fn();
    render(<Textarea placeholder="Notes" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText("Notes");
    fireEvent.change(textarea, { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
