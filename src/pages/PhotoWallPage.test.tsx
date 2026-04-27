import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhotoWallPage from "./PhotoWallPage";
import { renderWithRouter } from "../test/renderWithRouter";

describe("PhotoWallPage", () => {
  it("renders page title", () => {
    renderWithRouter(<PhotoWallPage />);
    expect(screen.getByText("照片墙")).toBeInTheDocument();
  });

  it("renders back button", () => {
    renderWithRouter(<PhotoWallPage />);
    expect(screen.getByText("返回首页")).toBeInTheDocument();
  });

  it("renders all 9 polaroid cards", () => {
    const { container } = renderWithRouter(<PhotoWallPage />);
    const cards = container.querySelectorAll(".polaroidCard");
    expect(cards.length).toBe(9);
  });

  it("renders cover image", () => {
    const { container } = renderWithRouter(<PhotoWallPage />);
    const cover = container.querySelector(".photoCover");
    expect(cover).toBeInTheDocument();
  });

  it("renders images with lazy loading", () => {
    const { container } = renderWithRouter(<PhotoWallPage />);
    const lazyImgs = container.querySelectorAll("img[loading='lazy']");
    expect(lazyImgs.length).toBeGreaterThanOrEqual(1);
  });

  it("opens lightbox when clicking a photo", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<PhotoWallPage />);
    const card = container.querySelector(".polaroidCard")!;
    await user.click(card);
    expect(container.querySelector(".lightboxOverlay")).toBeInTheDocument();
  });

  it("closes lightbox when clicking close button", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<PhotoWallPage />);
    await user.click(container.querySelector(".polaroidCard")!);
    await user.click(container.querySelector(".lightboxClose")!);
    expect(container.querySelector(".lightboxOverlay")).not.toBeInTheDocument();
  });
});
