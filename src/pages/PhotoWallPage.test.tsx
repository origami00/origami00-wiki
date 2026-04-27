import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
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

  it("renders photo items", () => {
    renderWithRouter(<PhotoWallPage />);
    expect(screen.getByText("白猫美猫")).toBeInTheDocument();
    // "北京" appears twice, use getAllByText
    expect(screen.getAllByText("北京").length).toBe(2);
  });

  it("renders images", () => {
    const { container } = renderWithRouter(<PhotoWallPage />);
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBeGreaterThanOrEqual(6);
  });

  it("images have lazy loading", () => {
    const { container } = renderWithRouter(<PhotoWallPage />);
    const imgs = container.querySelectorAll("img[loading='lazy']");
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });
});
