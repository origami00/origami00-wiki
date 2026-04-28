import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatCard from "./CatCard";

describe("CatCard", () => {
  it("renders photo wall label", () => {
    render(<CatCard onOpen={() => {}} />);
    expect(screen.getByLabelText("照片墙")).toBeInTheDocument();
  });

  it("renders cover image", () => {
    const { container } = render(<CatCard onOpen={() => {}} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/static/照片墙资产/23417_86777360146.jpg");
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
    expect(screen.getByLabelText("照片墙")).toBeInTheDocument();
  });
});
