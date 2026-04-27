import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { renderWithRouter } from "../test/renderWithRouter";

describe("HomePage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-27T06:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders profile card with greeting", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Nice to meet you/)).toBeInTheDocument();
  });

  it("renders cat card", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText("进入照片墙")).toBeInTheDocument();
  });

  it("renders calendar card", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByLabelText("日历")).toBeInTheDocument();
  });

  it("renders social links", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByLabelText("社交链接")).toBeInTheDocument();
  });

  it("renders latest content", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText("最新动态")).toBeInTheDocument();
  });

  it("renders music player", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByLabelText("音乐播放器")).toBeInTheDocument();
  });

  it("renders masonry layout", () => {
    const { container } = renderWithRouter(<HomePage />);
    expect(container.querySelector(".masonryColumns")).toBeInTheDocument();
  });
});
