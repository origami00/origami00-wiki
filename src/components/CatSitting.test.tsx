import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CatSitting from "./CatSitting";

describe("CatSitting", () => {
  it("renders an SVG element", () => {
    const { container } = render(<CatSitting />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has correct viewBox", () => {
    const { container } = render(<CatSitting />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 200 210");
  });

  it("contains SVG child elements", () => {
    const { container } = render(<CatSitting />);
    const svg = container.querySelector("svg");
    expect(svg!.children.length).toBeGreaterThan(5);
  });
});
