import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders an image", () => {
    const { container } = render(<Avatar />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("uses default size 64", () => {
    const { container } = render(<Avatar />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.width).toBe("64px");
    expect(div.style.height).toBe("64px");
  });

  it("accepts custom size", () => {
    const { container } = render(<Avatar size={48} />);
    const div = container.firstChild as HTMLElement;
    expect(div.style.width).toBe("48px");
    expect(div.style.height).toBe("48px");
  });

  it("applies className", () => {
    const { container } = render(<Avatar className="test-class" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toBe("test-class");
  });

  it("has aria-hidden", () => {
    const { container } = render(<Avatar />);
    const div = container.firstChild as HTMLElement;
    expect(div.getAttribute("aria-hidden")).toBe("true");
  });
});
