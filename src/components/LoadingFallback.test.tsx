import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoadingFallback from "./LoadingFallback";

describe("LoadingFallback", () => {
  it("renders without crashing", () => {
    const { container } = render(<LoadingFallback />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a spinner element", () => {
    const { container } = render(<LoadingFallback />);
    const spinner = container.querySelector("div > div");
    expect(spinner).toBeInTheDocument();
  });
});
