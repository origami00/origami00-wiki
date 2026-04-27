import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatCard from "./CatCard";

describe("CatCard", () => {
  it("renders photo wall label", () => {
    render(<CatCard onOpen={() => {}} />);
    expect(screen.getByText("进入照片墙")).toBeInTheDocument();
  });

  it("renders SVG cat", () => {
    const { container } = render(<CatCard onOpen={() => {}} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onOpen when clicked", async () => {
    const onOpen = vi.fn();
    const user = userEvent.setup();
    render(<CatCard onOpen={onOpen} />);
    await user.click(screen.getByRole("button"));
    expect(onOpen).toHaveBeenCalledOnce();
  });

  it("has aria-label", () => {
    render(<CatCard onOpen={() => {}} />);
    expect(screen.getByLabelText("进入照片墙")).toBeInTheDocument();
  });
});
