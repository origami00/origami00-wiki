import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageTransition from "./PageTransition";

function renderWithBrowserRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("PageTransition", () => {
  it("renders children", () => {
    renderWithBrowserRouter(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies enter class initially", () => {
    const { container } = renderWithBrowserRouter(
      <PageTransition>
        <div>Content</div>
      </PageTransition>,
    );
    const wrapper = container.querySelector(".pageTransition");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper!.className).toContain("enter");
  });
});
